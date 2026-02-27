import { listOrgRepos, listRepoPulls } from '../integrations/github'
import { upsertRepo } from '../db/repos'
import { upsertPR } from '../db/prs'

const ORG = process.env.GITHUB_ORG

export async function syncOnce(){
  if(!process.env.GITHUB_TOKEN || !ORG){
    console.log('GitHub token or org not configured; skipping sync')
    return
  }
  try{
    const repos = await listOrgRepos(ORG)
    for(const r of repos){
      await upsertRepo({ repo_id: r.id, name: r.name, full_name: r.full_name, url: r.html_url })
      // list pulls
      const pulls = await listRepoPulls(r.owner.login, r.name)
      for(const p of pulls){
        await upsertPR({ pr_id: p.id, repo_id: r.id, number: p.number, title: p.title, author: p.user?.login, state: p.state, merged: p.merged, url: p.html_url })
      }
    }
  }catch(err){
    console.error('sync error', err)
  }
}

export function startSyncWorker(intervalMs = 1000 * 60 * 5){
  // run once immediately
  syncOnce()
  setInterval(syncOnce, intervalMs)
}
