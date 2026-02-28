import "dotenv/config";
import express from 'express';
import { initDB } from './config/db.js';
import rateLimiterMiddleware from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoutes.js';

const app = express();

app.use(express.json());
app.use(rateLimiterMiddleware)

const PORT = process.env.PORT || 5009;


app.use("/api/transactions", transactionsRoute);

// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from the server!' });
// });

initDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
})