import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 MongoDB connected');
  } catch (err) {
    console.error('☠️ Failed To Connect MongoDB reason is ', err);
    process.exit(1); // otherwise no need to run this server
  }
};

export { connectDB };
