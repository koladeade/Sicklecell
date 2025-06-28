import express from 'express';
import authRoute from './routes/auth.routes.ts';
import dotenv from 'dotenv';

import connectdb from './db/db.ts';

const app = express();
const PORT = process.env.PORT || 5000;


connectdb();


app.use(express.json());

app.use('/api/auth', authRoute);

 app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});