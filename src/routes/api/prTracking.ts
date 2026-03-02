import { Router } from "express";
import { fetchPRTracking } from "../../services/githubRepoService";

const router = Router();

// GET /api/pr-tracking/:owner/:repo
router.get("/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const data = await fetchPRTracking(owner, repo);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'failed' });
  }
});

export default router;
