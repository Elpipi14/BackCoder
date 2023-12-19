import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
const userDao = new UserMongoDB();

export const register = async (user) => {
  try {
    const isRegistered = await userDao.register(user);
    return isRegistered;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const user = await userDao.login(email, password);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
