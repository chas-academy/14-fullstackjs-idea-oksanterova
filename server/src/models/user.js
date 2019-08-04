import mongoose from "mongoose";

import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, "No valid email address provided."]
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 42
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

userSchema.statics.findByLogin = async function(login) {
  return await this.findOne({
    $or: [{ username: login }, { email: login }]
  });
};

userSchema.pre("save", async function() {
  const saltOrRounds = 10;
  this.password = await bcrypt.hash(this.password, saltOrRounds);
});

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
