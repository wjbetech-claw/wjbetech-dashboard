import { Request, Response } from 'express';

export async function listRepos(req: Request, res: Response) {
  res.json({ repos: [] });
}

export async function getRepo(req: Request, res: Response) {
  const { owner, repo } = req.params;
  res.json({ owner, repo });
}

export default { listRepos, getRepo };
