import mongoose from 'mongoose';

export const connection = () => {
  const uri = process.env.MONGO_URI;
  mongoose.set('strictQuery', true);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connection;
