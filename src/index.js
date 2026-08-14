import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './db/index.js';

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 8000;

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    })
  )
  .catch((err) => {
    console.error('having issue while connecting to db ' + err);
    process.exit(1);
  });
