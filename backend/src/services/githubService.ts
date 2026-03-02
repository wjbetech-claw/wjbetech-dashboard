import createOctokit, { cached } from './octokit'
import db from '../db'

export async function getFeaturedRepos(){
  // attempt DB read
  try{
    const res = await db.query('SELECT owner, repo FROM featured_repos WHERE featured = true')
    const rows = res.rows
    if (rows && rows.length>0){
      const octokit = createOctokit()
      const detailed = await Promise.all(rows.map(async (r:any)=>{
        const key = `repo_${r.owner}_${r.repo}`
        const data = await cached(key, async ()=>{
          const resp = await octokit.repos.get({ owner: r.owner, repo: r.repo })
          return { id: resp.data.id, name: resp.data.name, full_name: resp.data.full_name, url: resp.data.html_url }
        }, 30_000)
        return data
      }))
      return detailed
    }
  }catch(e){
    // ignore and fallback
    console.warn('getFeaturedRepos db error', e)
  }

  // fallback list
  const fallback = [
    { owner: 'wjbetech', repo: 'dashboard' },
    { owner: 'wjbetech-claw', repo: 'wjbetech-dashboard' }
  ]
  const octokit = createOctokit()
  const detailed = await Promise.all(fallback.map(async (r:any)=>{
    const key = `repo_${r.owner}_${r.repo}`
    return cached(key, async ()=>{
      const resp = await octokit.repos.get({ owner: r.owner, repo: r.repo })
      return { id: resp.data.id, name: resp.data.name, full_name: resp.data.full_name, url: resp.data.html_url }
    }, 30_000)
  }))
  return detailed
}

export async function getOrgPRs(org:string, limit=5){
  const octokit = createOctokit()
  const key = `org_prs_${org}_${limit}`
  const data = await cached(key, async ()=>{
    const q = `org:${org} is:pr`
    const resp = await octokit.search.issuesAndPullRequests({ q, sort: 'created', order: 'desc', per_page: limit })
    return resp.data.items.map((it:any)=>({ id: it.id, title: it.title, url: it.html_url, repo: it.repository_url?.split('/').slice(-2).join('/') }))
  }, 30_000)
  return data
}

export async function getRepoActivities(owner:string, repo:string){
  // For now, return latest commits and open PRs combined with internal jobs if available
  const octokit = createOctokit()
  const commitsKey = `commits_${owner}_${repo}`
  const prsKey = `prs_${owner}_${repo}`
  const commits = await cached(commitsKey, async ()=>{
    const resp = await octokit.repos.listCommits({ owner, repo, per_page: 5 })
    return resp.data.map((c:any)=>({ sha: c.sha, message: c.commit.message, date: c.commit.author?.date, url: c.html_url }))
  }, 30_000)
  const prs = await cached(prsKey, async ()=>{
    const resp = await octokit.pulls.list({ owner, repo, per_page: 5, state: 'all' })
    return resp.data.map((p:any)=>({ id: p.id, number: p.number, title: p.title, state: p.state, url: p.html_url, created_at: p.created_at }))
  }, 30_000)

  // internal jobs: try to query jobs table for this repo full_name
  let jobs = []
  try{
    const res = await db.query('SELECT * FROM jobs WHERE repo_full_name = $1 ORDER BY updated_at DESC LIMIT 5', [ `${owner}/${repo}` ])
    jobs = res.rows
  }catch(e){
    // ignore
  }

  return { commits, prs, jobs }
}

export default { getFeaturedRepos, getOrgPRs, getRepoActivities }
