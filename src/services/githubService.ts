import { Octokit } from "octokit";

type CacheEntry<T> = { value: T; expiresAt: number };

class SimpleCache {
  private store: Map<string, CacheEntry<any>> = new Map();
  private ttlMs: number;

  constructor(ttlSeconds = 60) {
    this.ttlMs = ttlSeconds * 1000;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  set<T>(key: string, value: T) {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  clear() {
    this.store.clear();
  }
}

const cache = new SimpleCache(60); // default 60s cache

export class GitHubService {
  private octokit: Octokit;

  constructor(authToken?: string, cacheTtlSeconds?: number) {
    this.octokit = new Octokit({ auth: authToken });
    if (cacheTtlSeconds) {
      // replace cache with new TTL
      // (simple approach for now)
      // @ts-ignore
      cache.ttlMs = cacheTtlSeconds * 1000;
    }
  }

  async getFeaturedRepos(): Promise<Array<{ owner: string; repo: string; url: string; description?: string }>> {
    const cacheKey = `featured_repos`;
    const fromCache = cache.get<typeof Array>(cacheKey);
    if (fromCache) return fromCache;

    // For now, attempt to read a small list from a GitHub org pinned repos as fallback.
    // The authoritative list lives in the DB; this service provides an API-level cache and helper methods for GitHub calls.
    // Return empty — DB seed provides authoritative data. Keep method for future wiring.

    const result: Array<{ owner: string; repo: string; url: string; description?: string }> = [];
    cache.set(cacheKey, result);
    return result;
  }

  async listRecentRepoEvents(owner: string, repo: string, perPage = 30) {
    const cacheKey = `repo_events:${owner}:${repo}:${perPage}`;
    const fromCache = cache.get<any>(cacheKey);
    if (fromCache) return fromCache;

    const resp = await this.octokit.rest.activity.listRepoEvents({ owner, repo, per_page: perPage });
    const events = resp.data;

    cache.set(cacheKey, events);
    return events;
  }

  async listOrgPulls(org: string, perPage = 50) {
    const cacheKey = `org_pulls:${org}:${perPage}`;
    const fromCache = cache.get<any>(cacheKey);
    if (fromCache) return fromCache;

    // Use search API to find recent PRs for an org
    const q = `org:${org} is:pr`;
    const resp = await this.octokit.rest.search.issuesAndPullRequests({ q, per_page: perPage });
    const items = resp.data.items || [];

    cache.set(cacheKey, items);
    return items;
  }
}

export default GitHubService;
