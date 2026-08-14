import express from 'express';
import cors from 'cors';

const app = express();

// basic config
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.get('/instagram', (req, res) => {
  res.send('instagram page');
});

export default app;
