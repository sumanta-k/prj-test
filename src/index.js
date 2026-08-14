import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
