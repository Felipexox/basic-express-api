import mongoose from 'mongoose';

import User from './user.mjs';
import Post from './post.mjs';


const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Post };

export { connectDb };

export default models;
