import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.routes.js';
import dotenv from 'dotenv';

import connectdb from './db/db.js';

const app = express();
const PORT = process.env.PORT || 5000;


connectdb();


app.use(cors({
  origin: 'http://127.0.0.1:5500', // replace with your frontend's URL
  credentials: true
}));


app.use(express.json());

app.use('/api/auth', authRoute);

 app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});