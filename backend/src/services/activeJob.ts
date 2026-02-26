export type ActiveJob = {
  title: string
  kind: string
  source: string
  confidence: number
  signal: string
}

export function computeActiveJob(): ActiveJob {
  // Placeholder logic: pick the highest confidence signal (deterministic order)
  const candidates: ActiveJob[] = [
    { title: 'Latest PR activity', kind: 'pr', source: 'github', confidence: 0.9, signal: 'Most recently updated PR' },
    { title: 'Recent commit', kind: 'commit', source: 'github', confidence: 0.7, signal: 'Most recent commit' },
    { title: 'Top Kanban card', kind: 'kanban', source: 'local', confidence: 0.8, signal: 'Top priority card' },
  ]
  return candidates.sort((a, b) => b.confidence - a.confidence)[0]
}
