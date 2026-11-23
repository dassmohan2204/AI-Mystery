import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.info(`AI Mystery Room API listening on ${port}.`));
connectDatabase().catch(error => {
  console.error(`MongoDB connection failed: ${error.message}`);
  console.error('The API is running, but case endpoints will return 503 until MongoDB connects.');
});
