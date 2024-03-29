const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtExceptions', (err) => {
  console.log('uncaught exceptions!');
  console.log(err.name, err.message);
  process.exit(1);
});


dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  //  .connect(process.env.DATABASE_LOCAL, { // FOR LOCAL DATABASE //
  .connect(DB, {
    // FOR ATLAS //
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

// console.log(process.env);

// const testTour = new Tour({
//   name: 'The Park Camper',
//   // rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('An error occured!', err);
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  console.log('Server closed');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});



