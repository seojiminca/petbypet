//for passport. we can authenticate a use using this.
const userModel = require('../server/users/user.model');
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy;

const opts = {};

//to use the same instance throughout the app.
module.exports = passport => {
    new localStrategy(opts, (payload, done) => {
        userModel
            .findById(payload.id)
        if (!user) return done(null, false); //null is error. false is user
        bcrypt.compare(payload.password, user.password, (err, result) => {
            if(err) throw err;
            if(result === ture){
                return done(null, user);
            }
            else{
                return done(null, false)
            }
        })
    });

    //passport require serializeUser and deserializeUser
    //serializeUser stores a cookie inside of the browser
    passport.serializeUser((user,cb) => {
        cb(null, user.id); //create a cookie with the user ID
    })
    passport.deserializeUser((id,cb) => {
        userModel.findById(id, (err, user) => {
            cb(err, user);
        })
    })
};

//
// const {Strategy, ExtractJwt} = require('passport-jwt');
// const bcrypt = require('bcryptjs')
// const userModel = require('../server/users/user.model');
// const localStrategy = require('passport-local').Strategy;
//
// const opts = {};
//
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.secretKey || 'secret';
//
// module.exports = passport => {
//     passport.use(
//         new Strategy(opts, (payload, done) => {
//             userModel
//                 .findById(payload.id)
//                 .then(user => {
//                     if(user){
//                         return done(null, user);
//                     }
//                     return done(null, false);
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 });
//         })
//     );
// };
