import express from 'express';
// Only import routers that exist under src/routes/api to avoid startup import errors
import featuredReposRouter from './routes/api/featuredRepos';
import repoActivitiesRouter from './routes/api/repoActivities';
import prTrackingRouter from './routes/api/prTracking';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.send('wjbetech-dashboard backend');
});

// Mount available API routes
app.use('/api/featured', featuredReposRouter);
app.use('/api/repo-activities', repoActivitiesRouter);
app.use('/api/pr-tracking', prTrackingRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
