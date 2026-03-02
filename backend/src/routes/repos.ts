import express from 'express';
import reposController from '../controllers/reposController';

const router = express.Router();

router.get('/', reposController.listRepos);
router.get('/:owner/:repo', reposController.getRepo);

export default router;
