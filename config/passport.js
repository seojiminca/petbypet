const {Strategy, ExtractJwt} = require('passport-jwt');
const userModel = require('../server/models/user');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey || 'secret';

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            userModel
                .findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err)
                });
        })
    );
};
