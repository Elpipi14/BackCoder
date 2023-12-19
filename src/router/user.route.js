import { Router } from "express";
import * as userControllers from "../controllers/user.controllers.js";
import passport from "passport";
import { loginRoute } from "../middlewares/validateLogin.js";

const routerUser = Router();

routerUser.post('/register', passport.authenticate('register'), userControllers.register);

routerUser.post('/login', loginRoute, (req, res, next) => {
    passport.authenticate('login', {
      failureRedirect: '/login-error',
    })(req, res, next);
  }, userControllers.login);

routerUser.get("/logout", userControllers.logout);

routerUser.get('/register-gitHub', passport.authenticate("github", { scope: ["user:email"] }));

routerUser.get('/gitHub', passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/profile',
    passReqToCallback: true
}));



export default routerUser;


