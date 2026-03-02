import { Router } from "express";
import { fetchRepoActivities } from "../../services/githubRepoService";

const router = Router();

// GET /api/repo-activities/:owner/:repo
router.get("/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const activities = await fetchRepoActivities(owner, repo);
    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'failed' });
  }
});

export default router;
