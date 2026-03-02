// Octokit wrapper with in-memory caching and basic rate-limit/backoff
/*
  Exposes:
  - createOctokit(token?)
  - cached(key, fn, ttlMs)
  - clearCache()
  - withRateLimit(fn) helper to wrap Octokit calls with retry/backoff based on rate limit headers
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Octokit } = require('@octokit/rest');

type CacheEntry = { expires: number; value: any };
const cache = new Map<string, CacheEntry>();

export function createOctokit(token?: string) {
  return new Octokit({ auth: token || process.env.GITHUB_TOKEN });
}

export async function cached(key: string, fn: () => Promise<any>, ttlMs = 30_000) {
  const now = Date.now();
  const e = cache.get(key);
  if (e && e.expires > now) return e.value;

  const val = await fn();
  cache.set(key, { value: val, expires: now + ttlMs });
  return val;
}

export function clearCache() {
  cache.clear();
}

function sleep(ms:number){ return new Promise(r=>setTimeout(r,ms)) }

// Basic rate-limit/backoff wrapper.
export async function withRateLimit<T>(fn: ()=>Promise<T>, opts?:{retries?:number, baseMs?:number}){
  const retries = opts?.retries ?? 3
  const base = opts?.baseMs ?? 500
  let attempt = 0
  while(true){
    try{
      return await fn()
    }catch(err:any){
      attempt++
      // try to inspect response headers for rate limit reset
      const resp = err && err.response && err.response.headers
      if (resp){
        const rlRemaining = resp['x-ratelimit-remaining'] ? parseInt(resp['x-ratelimit-remaining']) : NaN
        const rlReset = resp['x-ratelimit-reset'] ? parseInt(resp['x-ratelimit-reset'])*1000 : NaN
        if (!isNaN(rlRemaining) && rlRemaining===0 && !isNaN(rlReset)){
          const wait = Math.max(0, rlReset - Date.now()) + base
          await sleep(wait)
          continue
        }
      }
      if (attempt>retries) throw err
      await sleep(base * attempt)
    }
  }
}

export default createOctokit;
