export async function getOverview() {
    const res = await fetch('/api/overview');
    if (!res.ok)
        throw new Error('Failed to load overview');
    return res.json();
}
export async function getRepos() {
    const res = await fetch('/api/repos');
    if (!res.ok)
        throw new Error('Failed to load repos');
    return res.json();
}
export async function getJobs() {
    const res = await fetch('/api/jobs');
    if (!res.ok)
        throw new Error('Failed to load jobs');
    return res.json();
}
export async function updateJobStatus(id, status) {
    const res = await fetch(`/api/jobs/${id}/${status}`, { method: 'POST' });
    if (!res.ok)
        throw new Error('Failed to update job');
    return res.json();
}
export async function getActiveJob() {
    const res = await fetch('/api/active-job');
    if (!res.ok)
        throw new Error('Failed to load active job');
    return res.json();
}
//# sourceMappingURL=api.js.map