import { Router } from "express";
import { fetchFeaturedRepos } from "../../services/githubRepoService";

const router = Router();

// GET /api/featured/:username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const repos = await fetchFeaturedRepos(username);
    res.json(repos);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'failed' });
  }
});

export default router;
