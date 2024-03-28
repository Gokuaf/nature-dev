const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
// const { isUtf8 } = require('buffer');

dotenv.config({ path: './config.env' });
// const app = require('./app');

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

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
//import data to db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successsful loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete data

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successsful deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};


if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
  deleteData();
}


// console.log(process.argv);