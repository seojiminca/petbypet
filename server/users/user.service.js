const express = require('express');
const router = express.Router();
const userModel = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login');

module.exports = {
    create,
    login,
    delete: _delete
}

//@route POST http://localhost:5000/users
//@desc register
//@access Public
async function create(userParam) {  
    if(await userModel.findOne({email: userParam.email})) {
        throw 'Email " ' + userParam.email + '" is already taken';
    }
        
    const newUser = new userModel(userParam);

    if (userParam.password) {
        newUser.hash = bcrypt.hashSync(userParam.password, 10);
    }
   
    await newUser.save();
}



//@route POST http://localhost:5000/users/
//@desc login
//@access Public
async function login(userParam) {
    const {errors, isValid} = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //console.log(email, password);
    await userModel
        .findOne({email: userParam.email})
        .then(user => {
                //console.log(user);

                if (!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                }
                bcrypt
                    .compare(userParam.password, user.hash)
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
}

//@route DELETE http://localhost:5000/api/users/
//@desc delete
//@access Private - admin만 접근가능
async function _delete(userParam) {
    userModel
        .findOneAndDelete({user: userParam.id})
        .then(() => {
            res.json({success: true});
        })
}


//@route GET http://localhost:5000/users/
//@desc logout
//@access Private - admin만 접근가능


//@route PATCH http://localhost:5000/users/
//@desc update password
//@access Private


