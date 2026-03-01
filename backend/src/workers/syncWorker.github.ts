// Minimal sync worker skeleton
import createOctokit from '../services/octokit';

export async function runSync() {
  const octokit = createOctokit();
  // placeholder: list repos for authenticated user
  const res = await octokit.repos.listForAuthenticatedUser({ per_page: 5 });
  return res.data.map((r: any) => ({ id: r.id, name: r.name, full_name: r.full_name }));
}

export default runSync;
