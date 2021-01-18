import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './api/index';
import usersRouter from './api/users';
import authRouter from './api/auth';

import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB!);

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB Connected');
});

db.on('error', (err) => {
  console.log('DB ERROR: ', err);
});

const app: Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

export default app;
