import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { notFound, handleError } from './middlewares/error.js';
import connectDB from './db/db.js';
import userRoutes from './routes/user.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.get('/', (req, res) => {
  res.json({
    message: 'Api is running'
  });
});

app.use('/api/users', userRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(handleError);

app.listen(5000, console.log('Server is running'));
