import cron from 'node-cron'
import { listReposByOrgs, listPullRequests, listWorkflowRuns } from '../integrations/github'

export function startSyncWorker() {
  const orgs = (process.env.GITHUB_ORG || '').split(',').map(s => s.trim()).filter(Boolean)
  if (!orgs.length) {
    console.warn('GITHUB_ORG not set, skipping sync worker')
    return
  }

  cron.schedule('*/10 * * * *', async () => {
    console.log('[syncWorker] start')
    try {
      const repos = await listReposByOrgs(orgs)
      for (const repo of repos) {
        const [owner, name] = repo.full_name.split('/')
        await listPullRequests(owner, name)
        await listWorkflowRuns(owner, name)
      }
      console.log('[syncWorker] done')
    } catch (err) {
      console.error('[syncWorker] error', err)
    }
  })
}
