import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
  },
  admin: {
    type: Boolean,
    default: false,
    unique: false
  },
  token: {
    type: String,
    unique: false
  }
});
userSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password,10);
  this.password =hash;
  next();
});

userSchema.statics.existsAccountLogin = async function(login, pwd) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    return res.status(400);
  }

  if(!await bcrypt.compare(password, user.password)){
    console.log(password, user.password)
    return res.status(400).send({error: "Senha Invalida"});
  }

  return user;
};


userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
