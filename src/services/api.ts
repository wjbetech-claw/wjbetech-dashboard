export async function getOverview(){
  const res = await fetch('/api/overview')
  if(!res.ok) throw new Error('Failed to load overview')
  return res.json()
}

export async function getRepos(){
  const res = await fetch('/api/repos')
  if(!res.ok) throw new Error('Failed to load repos')
  return res.json()
}
