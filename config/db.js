const mongoose = require('mongoose');
// const config = require('config');  config.get('mongoURI');

const  db = require("./keys").mongoURI

const connectDB = async () => {
  try {
    await mongoose //mongoose.connect(uri, options);
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
