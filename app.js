/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

const todoRoutes = require('./routes/todo');
const doingRoutes = require('./routes/doing');
const doneRoutes = require('./routes/done');
const userRoutes = require('./routes/user');

app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Connect to DB
mongoose
  .connect(process.env.API_KEY, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

// Set CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/todo', todoRoutes);
app.use('/api/doing', doingRoutes);
app.use('/api/done', doneRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
