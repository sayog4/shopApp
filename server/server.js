import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import { notFound, handleError } from './middlewares/error.js';
import connectDB from './db/db.js';
import userRoutes from './routes/user.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Api is running'
    });
  });
}

app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT, console.log('Server is running'));
