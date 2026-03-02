import { request } from "./githubClient";

export const fetchFeaturedRepos = async (username: string) => {
  // featured repos: fetch user's repos and return top-starred 5
  const res = await request("GET", `/users/${username}/repos`, { per_page: 100 });
  const repos = Array.isArray(res.data) ? res.data : [];
  repos.sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  return repos.slice(0, 5);
};

export const fetchRepoActivities = async (owner: string, repo: string) => {
  // repo activities: list recent events for the repo
  // GitHub API: /repos/{owner}/{repo}/events
  const res = await request("GET", `/repos/${owner}/${repo}/events`, { per_page: 50 });
  return res.data;
};

export const fetchPRTracking = async (owner: string, repo: string) => {
  // PR tracking: list open PRs with review/status summary
  const res = await request("GET", `/repos/${owner}/${repo}/pulls`, { per_page: 50, state: "open" });
  const prs = Array.isArray(res.data) ? res.data : [];
  // attach basic status info
  const detailed = await Promise.all(prs.map(async (pr: any) => {
    const statusesRes = await request("GET", `/repos/${owner}/${repo}/commits/${pr.head.sha}/status`);
    return {
      number: pr.number,
      title: pr.title,
      user: pr.user?.login,
      draft: pr.draft || false,
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      head_sha: pr.head?.sha,
      status: statusesRes.data || null,
      url: pr.html_url
    };
  }));
  return detailed;
};

export default { fetchFeaturedRepos, fetchRepoActivities, fetchPRTracking };
