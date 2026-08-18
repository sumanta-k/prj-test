import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    avatar: {
      type: { url: String, localPath: String },
      default: { url: `https://placehold.co/200x200`, localPath: String }
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    fullName: { type: String, trim: true },
    email: { type: String, unique: true, trim: true, lowercase: true },
    password: { type: String, required: [true, 'password is required'] },
    isPasswordVerified: { type: Boolean, default: false },
    refreshToken: { type: String },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: Date }
  },
  { timestamps: true }
);

// hooks

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  await bcrypt.hash(this.password);
  next();
});

// methods attach to object/document
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // [true or false]
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};
const User = mongoose.model('user', userSchema);
