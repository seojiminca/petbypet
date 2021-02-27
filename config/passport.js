// //for passport. we can authenticate a use using this.
// const userModel = require('../server/users/user.model');
// const bcrypt = require('bcryptjs')
// const localStrategy = require('passport-local').Strategy;
//
// const opts = {};
//
// //to use the same instance throughout the app.
// module.exports = passport => {
//     new localStrategy(opts, (email, done) => {
//         userModel
//             .findById({email})
//         if (!user) return done(null, false); //null is error. false is user
//         bcrypt.compare(payload.password, user.password, (err, result) => {
//             if (err) throw err;
//             if (result === ture) {
//                 return done(null, user);
//             } else {
//                 return done(null, false)
//             }
//         })
//     });
//
//     //passport require serializeUser and deserializeUser
//     //serializeUser stores a cookie inside of the browser
//     passport.serializeUser((user, cb) => {
//         cb(null, user.id); //create a cookie with the user ID
//     })
//     passport.deserializeUser((id, cb) => {
//         userModel.findById(id, (err, user) => {
//             cb(err, user);
//         })
//     })
// };


const {Strategy, ExtractJwt} = require('passport-jwt');
const userModel = require('../server/users/user.model');

// passport-jwt인증에 사용할 옵션.
const opts = {};
// header에 bearer스키마에 담겨온 토큰 해석할 것.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// 해당 복호화 방법사용.
opts.secretOrKey = process.env.JWT_SECRET || 'secret';

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            userModel
                .findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, user); //인증성공시 user리턴.
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err)
                });
        })
    );
};

