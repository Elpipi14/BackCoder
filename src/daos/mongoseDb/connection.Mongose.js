import mongoose from 'mongoose';

export const connectionString = "mongodb+srv://admin:admin14@clusterecommerce.bfjaefn.mongodb.net/EcommerceCoderBack?retryWrites=true&w=majority";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};