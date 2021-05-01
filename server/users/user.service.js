const userModel = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login');

module.exports = {
    register,
    login,
    delete: _delete
}

//@route POST http://localhost:5000/users
//@desc register
//@access Public
async function register(userParam) {
    if(await userModel.findOne({email: userParam.email})) {
        throw 'Email " ' + userParam.email + '" is already taken';
    }

    const newUser = new userModel(userParam);

    if (userParam.password) {
        newUser.hashed = bcrypt.hashSync(userParam.password, 10);
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

    const user = await userModel.findOne({email}).populate("cat");

    if (user && bcrypt.compareSync(password, user.hashed)) {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 3600});

        return {
            ...user.toJSON(),
            token
        }
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


