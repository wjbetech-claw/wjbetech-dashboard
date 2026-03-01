// Minimal Octokit wrapper (skeleton)
// Use runtime require to avoid TypeScript resolution issues in CI when types are missing.
export function createOctokit(token?: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Octokit } = require('@octokit/rest');
  return new Octokit({ auth: token || process.env.GITHUB_TOKEN });
}

export default createOctokit;
