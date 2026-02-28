import express from 'express';
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});
app.get('/', (_req, res) => {
    res.send('wjbetech-dashboard backend');
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map