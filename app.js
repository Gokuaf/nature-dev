const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const  globalErrorHandler = require('./controllers/errorController.js');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // log requests to the console
}

app.use(express.json()); // for parsing application/json/middleware
app.use(express.static(`${__dirname}/public`)); // serve static files from public folder

// app.use((req, res, next) => {
//   console.log('hello');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
