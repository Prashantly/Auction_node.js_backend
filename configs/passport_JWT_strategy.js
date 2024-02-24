import passport from "passport";
import User from "../models/User.js";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env["JWT_SECRET"],
};

passport.use(
    new jwtStrategy(options, async function (jwt_payload, done) {
        // console.log(jwt_payload);
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export { passport, jwtStrategy };