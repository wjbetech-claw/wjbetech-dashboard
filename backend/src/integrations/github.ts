import { Octokit } from 'octokit'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.GITHUB_TOKEN

function getOctokit(){
  if(!token) throw new Error('GITHUB_TOKEN not set')
  return new Octokit({ auth: token })
}

export async function listOrgRepos(org: string){
  const octo = getOctokit()
  const repos: any[] = []
  for await (const response of octo.paginate.iterator(octo.rest.repos.listForOrg, { org })){
    repos.push(...response.data)
  }
  return repos
}

export async function listRepoPulls(owner: string, repo: string){
  const octo = getOctokit()
  const pulls = await octo.rest.pulls.list({ owner, repo })
  return pulls.data
}
