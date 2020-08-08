const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');

// checking JWT
const checkAuth = passport.authenticate('jwt', {session: false});

//@route POST http://localhost:5000/users
//@desc register
//@access Public
router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    userModel
        .findOne({email})
        .exec()
        .then(user => {
            if (user) {
                return res.json("email already exists.");
            }

            const newUser = new userModel({
                name: name,
                email: email,
                password: password
            });

            if (password) {
                newUser.hash = bcrypt.hashSync(password, 10);
            }

            newUser
                .save()
                .then(user => {
                    res.json({
                        msg: "new user added.",
                        userInfo: user
                    });
                })
                .catch(err => {
                    res.json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});

//@route POST http://localhost:5000/users/
//@desc login
//@access Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {email, password} = req.body;

    //console.log(email, password);
    userModel
        .findOne({email})
        .then(user => {
                //console.log(user);

                if (!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                }
                bcrypt
                    .compare(password, user.hash)
                    .then(isMatch => {
                        if (isMatch) {
                            jwt.sign(
                                {id: user.id},
                                process.env.secretKey,
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                }
                            );
                        } else {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors);
                        }
                    })
                    .catch(err => res.json(err))

            }
        )
        .catch(err => res.json(err));
})

//@route DELETE http://localhost:5000/api/users/
//@desc delete
//@access Private - admin만 접근가능
router.delete('/', checkAuth, (req, res) => {
    userModel
        .findOneAndDelete({user: req.user.id})
        .then(() => {
            res.json({success: true});
        })
})


//@route GET http://localhost:5000/users/
//@desc logout
//@access Private - admin만 접근가능


//@route PATCH http://localhost:5000/users/
//@desc update password
//@access Private


module.exports = router;
