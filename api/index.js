import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from './session/index.js';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.get('env') === 'production' ? app.set('trust proxy', 1) : ''
app.use("/api/user", session(app));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on ${process.env.SERVER_PORT}`);
});

// app.set("view engine", "pug");

app.use('/api/user', userRouter);
// app.use('/api/admin', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);


app.use(express.static(path.join(__dirname, '/client/app')));
// app.use(express.static(path.join(__dirname, '/client/app')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'app', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
