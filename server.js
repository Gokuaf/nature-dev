const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});
