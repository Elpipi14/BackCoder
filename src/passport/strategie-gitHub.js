import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongoseDb/DB/user.mongose.js";

const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.b1b1bb9978f789db",
  clientSecret: "6e1378fabe82474292616fcef6e6481be137ef29",
  callbackURL: "http://localhost:8080/users/github",
  scope: ['user', 'users:email'],
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
  const user = await userDao.findByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name,
    email,
    password: " ",
    image: profile._json.avatar_url,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));