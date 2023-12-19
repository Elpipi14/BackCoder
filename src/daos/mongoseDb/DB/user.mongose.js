import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export default class UserMongoDB {
  async findByEmail(email) {
    try {
      const response = await UserModel.findOne({ email });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getById(id){
    try {
      const userExist = await UserModel.findById(id)
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      console.log(error)
    }
  }
  
  async register(user) {
    try {
      const { email, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10); 

      const userId = uuidv4();
  
      const newUser = {
        cartId: userId,
        ...user,
        password: hashedPassword,
      };
  
      const userExist = await UserModel.findOne({ email });
  
      if (userExist) {
        return null; 
      }
  
      const createdUser = await UserModel.create(newUser);
      return createdUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email: email });
      if (userExist) {
        const passwordMatch = await bcrypt.compare(password, userExist.password);
  
        if (passwordMatch) {
          console.log('Login - Password matched. User logged in:', userExist);
          return userExist;
        } else {
          console.log('Login - Incorrect password');
        }
      } else {
        console.log('Login - User not found');
      }
      return null;
    } catch (error) {
      console.error('Login - Error:', error);
      throw error;
    }
  }
  
};