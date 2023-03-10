const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'Password not strong Enough. Must contain at least 8 characters'
    );
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }
  //create salt for password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashPass });

  return user;
};

module.exports = mongoose.model('User', userSchema);
