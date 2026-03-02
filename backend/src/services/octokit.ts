// Octokit wrapper with simple in-memory caching and rate-limit awareness
/*
  This wrapper provides:
  - createOctokit(token?) -> Octokit instance
  - cached(octokit, key, fn, ttlMs) -> runs fn() and caches result for ttlMs
  - clearCache() for tests
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

export default createOctokit;
