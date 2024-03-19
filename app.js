
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev')); // log requests to the console
app.use(express.json()); // for parsing application/json/middleware

app.use((req, res, next) => {
  console.log('hello');
  next();
});

module.exports = app;










app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log('server running on port ${port}');
});
