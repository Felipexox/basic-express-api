var mongoose = require('mongoose');

var User = require('./user.js');


const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User };

export { connectDb };

export default models;
