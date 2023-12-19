import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
const userDao = new UserMongoDB();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const user = await userDao.findByEmail(email);
    if (user) return done(null, false, { message: "User already exists" });

    const newUser = await userDao.register(req.body);
    return done(null, newUser);
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = await userDao.login(email, password);
    if (!user) return done(null, false, { message: "Invalid credentials" });
    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error);
  }
};


const signUpStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);

//req.session.passport.user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  // console.log('deserialize', user);
  return done(null, user);
});

export { signUpStrategy, loginStrategy };