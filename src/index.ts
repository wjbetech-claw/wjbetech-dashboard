import express from 'express';
import reposRouter from './routes/api/repos';
import pullsRouter from './routes/api/pulls';
import workflowsRouter from './routes/api/workflows';
import overviewRouter from './routes/api/overview';
import jobsRouter from './routes/api/jobs';
import activeJobRouter from './routes/api/activeJob';
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

app.use('/api/repos', reposRouter);
app.use('/api/pulls', pullsRouter);
app.use('/api/workflows', workflowsRouter);
app.use('/api/overview', overviewRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/active-job', activeJobRouter);
app.use('/api/featured', featuredReposRouter);
app.use('/api/repo-activities', repoActivitiesRouter);
app.use('/api/pr-tracking', prTrackingRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
