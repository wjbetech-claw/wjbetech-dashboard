import express from 'express';
import reposRouter from './routes/repos';

const app = express();
app.use(express.json());

app.use('/api/repos', reposRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

export default app;
