import { Octokit } from "@octokit/rest";
import LRU from "lru-cache";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
if (!token) {
  console.warn('GITHUB_TOKEN not set — Octokit will be unauthenticated and rate-limited');
}

const octokit = new Octokit({ auth: token });

const cache = new LRU<string, any>({ max: 500, ttl: 1000 * 60 }); // 1 minute

export async function cachedRequest(key: string, fn: () => Promise<any>) {
  const hit = cache.get(key);
  if (hit) return hit;
  const res = await fn();
  cache.set(key, res);
  return res;
}

export async function getRepo(owner: string, repo: string) {
  return cachedRequest(`repo:${owner}/${repo}`, async () => {
    const { data } = await octokit.repos.get({ owner, repo });
    return data;
  });
}

export async function listOrgPRs(org: string, params: { state?: string; per_page?: number } = {}) {
  const key = `org_prs:${org}:${JSON.stringify(params)}`;
  return cachedRequest(key, async () => {
    const res = await octokit.paginate(octokit.pulls.list, {
      owner: org,
      state: params.state || 'open',
      per_page: params.per_page || 30,
    } as any);
    return res;
  });
}

export default octokit;
