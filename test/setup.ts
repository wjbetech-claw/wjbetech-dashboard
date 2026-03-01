import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

// expose userEvent globally for tests
;(globalThis as any).userEvent = userEvent

// Ensure modal portal root exists for libraries that render into a portal (#modal-root)
if (typeof document !== 'undefined') {
  if (!document.getElementById('modal-root')) {
    const div = document.createElement('div')
    div.id = 'modal-root'
    document.body.appendChild(div)
  }
}

// Mock fetch for relative URLs to avoid real network calls during tests
const originalFetch = globalThis.fetch
globalThis.fetch = async (input: RequestInfo, init?: RequestInit) => {
  try{
    let urlStr = typeof input === 'string' ? input : (input as Request).url
    // resolve relative paths
    if(urlStr.startsWith('/')) urlStr = new URL(urlStr, 'http://localhost').toString()
    const u = new URL(urlStr)
    // Provide deterministic fake responses for API endpoints used in tests
    if((u.hostname === 'localhost' || u.hostname === '127.0.0.1')){
      if(u.pathname.startsWith('/repos') || u.pathname.startsWith('/api/repos')){
        const repos = [
          { id: 1, name: 'wjbetech-dashboard', full_name: 'wjb/wjbetech-dashboard', html_url: 'https://github.com/wjb/wjbetech-dashboard', owner: { login: 'wjb' } }
        ]
        return new Response(JSON.stringify(repos), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      if(u.pathname.startsWith('/jobs') || u.pathname.startsWith('/api/jobs')){
        const jobs = [
          { id: 1, title: 'Frontend Engineer', company: 'WJB', location: 'Remote' }
        ]
        return new Response(JSON.stringify(jobs), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      if(u.pathname.startsWith('/api') ){
        // generic api fallback
        return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
    }
  }catch(err){
    // fallthrough
  }
  return originalFetch!(input as any, init)
}
