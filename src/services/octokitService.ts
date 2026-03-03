import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const octokit = new Octokit({ auth: token });

// Simple in-memory cache with TTL
type CacheEntry = {
  value: any;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 60 * 1000; // 1 minute

function cacheKey(method: string, url: string, params?: any) {
  return `${method.toUpperCase()}:${url}:${JSON.stringify(params || {})}`;
}

export async function cachedRequest(method: string, url: string, params?: any, ttl = DEFAULT_TTL) {
  const key = cacheKey(method, url, params);
  const now = Date.now();
  const existing = cache.get(key);
  if (existing && existing.expiresAt > now) return existing.value;

  // Basic rate-limit awareness: check core rate limit before request
  try {
    const rate = await octokit.request("GET /rate_limit");
    const remaining = rate.data.rate.remaining || 0;
    if (remaining < 5) {
      // if near exhaustion, back off and return stale cache if available
      if (existing) return existing.value;
      // otherwise throw an informative error
      throw new Error("GitHub rate limit low: " + JSON.stringify(rate.data.rate));
    }
  } catch (e) {
    // If rate check fails, continue — best-effort
    // console.warn("rate check failed", e);
  }

  const res = await octokit.request(url, params || {});
  const value = res.data;
  cache.set(key, { value, expiresAt: now + ttl });
  return value;
}

export function clearCache() {
  cache.clear();
}

export default octokit;
