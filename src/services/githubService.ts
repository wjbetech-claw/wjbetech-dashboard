import { Octokit } from 'octokit';

// Simple Octokit wrapper with in-memory caching for common calls
// This is intentionally small and testable; we'll expand rate-limit handling later.

type CacheEntry = {
  ts: number;
  data: any;
};

const CACHE_TTL_MS = 1000 * 60; // 1 minute

export class GithubService {
  private octokit: Octokit;
  private cache: Map<string, CacheEntry> = new Map();

  constructor(token?: string) {
    this.octokit = new Octokit({ auth: token || process.env.GITHUB_PAT });
  }

  private getCached(key: string) {
    const e = this.cache.get(key);
    if (!e) return null;
    if (Date.now() - e.ts > CACHE_TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    return e.data;
  }

  private setCached(key: string, data: any) {
    this.cache.set(key, { ts: Date.now(), data });
  }

  async getRepo(owner: string, repo: string) {
    const key = `repo:${owner}/${repo}`;
    const cached = this.getCached(key);
    if (cached) return cached;
    const res = await this.octokit.rest.repos.get({ owner, repo });
    this.setCached(key, res.data);
    return res.data;
  }

  async listOrgPRs(org: string, params: { state?: string; per_page?: number } = {}) {
    const key = `prs:org:${org}:${params.state || 'all'}:${params.per_page || 30}`;
    const cached = this.getCached(key);
    if (cached) return cached;
    // For now fetch first page only; we'll expand pagination later.
    const res = await this.octokit.rest.pulls.listForOrg({ org, per_page: params.per_page || 30 });
    this.setCached(key, res.data);
    return res.data;
  }

  // lightweight activity fetch — placeholder to be used by endpoints
  async listRepoEvents(owner: string, repo: string) {
    const key = `events:${owner}/${repo}`;
    const cached = this.getCached(key);
    if (cached) return cached;
    const res = await this.octokit.rest.activity.listRepoEvents({ owner, repo, per_page: 50 });
    this.setCached(key, res.data);
    return res.data;
  }
}

export default new GithubService();
