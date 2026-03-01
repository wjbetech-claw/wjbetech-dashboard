import '@testing-library/jest-dom'

// Mock fetch for relative URLs to avoid real network calls during tests
const originalFetch = globalThis.fetch
globalThis.fetch = async (input: RequestInfo, init?: RequestInit) => {
  try{
    let urlStr = typeof input === 'string' ? input : (input as Request).url
    // resolve relative paths
    if(urlStr.startsWith('/')) urlStr = new URL(urlStr, 'http://localhost').toString()
    const u = new URL(urlStr)
    // If running against localhost with no server, return empty list for API endpoints we expect
    if((u.hostname === 'localhost' || u.hostname === '127.0.0.1') && (u.pathname.startsWith('/api') || u.pathname.startsWith('/repos') || u.pathname.startsWith('/jobs'))){
      return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  }catch(err){
    // fallthrough
  }
  return originalFetch!(input as any, init)
}
