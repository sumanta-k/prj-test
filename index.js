import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: './.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

app.get('/instagram', (req, res) => {
  res.send('Here We go on the instagram page');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
