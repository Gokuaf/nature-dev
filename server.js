const app = require('./app');
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });