import express from 'express';
import { Pool } from 'pg';
import activeJobService from '../services/activeJob';

const router = express.Router();
const pool = new Pool();

router.get('/', async (req, res) => {
  const job = await activeJobService.fetchAndCompute(pool);
  res.json({ activeJob: job });
});

export default router;
