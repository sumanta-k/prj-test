import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.get('/instagram', (req, res) => {
  res.send('instagram page');
});

export default app;
