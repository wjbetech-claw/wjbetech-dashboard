import { Octokit } from '@octokit/rest'

export function createOctokit() {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN missing')
  return new Octokit({ auth: token })
}

export async function listReposByOrgs(orgNames: string[]) {
  const octokit = createOctokit()
  const repos = [] as any[]
  for (const org of orgNames) {
    const res = await octokit.repos.listForOrg({ org, per_page: 100 })
    repos.push(...res.data)
  }
  return repos
}

export async function listPullRequests(owner: string, repo: string) {
  const octokit = createOctokit()
  const res = await octokit.pulls.list({ owner, repo, state: 'open', per_page: 100 })
  return res.data
}

export async function listWorkflowRuns(owner: string, repo: string, branch?: string) {
  const octokit = createOctokit()
  const res = await octokit.actions.listWorkflowRunsForRepo({ owner, repo, branch, per_page: 100 })
  return res.data.workflow_runs
}
