import express from 'express';
import cors from 'cors';

const app = express();

// basic config
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(
  cors({
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    origin: process.env.ORIGIN?.split(',') || 'http://127.0.0.1:5173'
  })
);

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.get('/instagram', (req, res) => {
  res.send('instagram page');
});

export default app;
