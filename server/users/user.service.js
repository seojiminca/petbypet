const express = require('express');
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

    return await newUser.save();
}



//@route POST http://localhost:5000/users/login
//@desc login
//@access Public
async function login({email, password}) {
    const {errors, isValid} = validateLogin({email, password});

    if (!isValid) {
        throw errors;
    }

    const user = await userModel.findOne({email})

    if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
    }
                    //await사용 - compareSync로 변경. 동기함수,비동기함수인지 생각할 것.
    if(user && bcrypt.compareSync(password, user.hash)){
                    //jwt는 인코딩이지 암호화가 아니라서 절대 개인정보를 넣어서는 안된다.
        const token = jwt.sign({id: user.id},process.env.secretKey,{expiresIn: 3600});

        return {
            ...user.toJSON(),
            token
        }

    }else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
    }
}

//@route DELETE http://localhost:5000/api/users/
//@desc delete
//@access Private - admin만 접근가능
async function _delete(id) {
    await userModel.findByIdAndRemove(id)
}


//@route GET http://localhost:5000/users/
//@desc logout
//@access Private - admin만 접근가능


//@route PATCH http://localhost:5000/users/
//@desc update password
//@access Private


