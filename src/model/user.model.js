import mongoose, { Schema } from 'mongoose';

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

const User = mongoose.model('user', userSchema);
