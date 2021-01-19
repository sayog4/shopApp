import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './db/db.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Api is running'
  });
});

app.get('/api/home', (req, res) => {
  res.json({
    message: 'Api is running'
  });
});

app.listen(5000, console.log('Server is running'));
