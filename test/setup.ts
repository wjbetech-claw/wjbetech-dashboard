import '@testing-library/jest-dom'

// Ensure relative fetch URLs work in Node's environment by resolving against localhost
const originalFetch = globalThis.fetch
globalThis.fetch = (input: RequestInfo, init?: RequestInit) => {
  try{
    if(typeof input === 'string'){
      // if it's a relative path, resolve it
      if(input.startsWith('/')){
        return originalFetch!(new URL(input, 'http://localhost').toString(), init)
      }
    } else if(input instanceof Request){
      const url = input.url
      if(url.startsWith('/')){
        const req = new Request(new URL(url, 'http://localhost').toString(), input)
        return originalFetch!(req)
      }
    }
  }catch(err){
    // fallthrough to default
  }
  return originalFetch!(input as any, init)
}
