const express = require('express');
const router = express.Router();
const catModel = require('./cat.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');

module.exports = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
}

//@route POST http://localhost:5000/cats/
//@desc register cats
//@access Private
async function register(userId, catParam) {
    const cat = new catModel(catParam);
    cat.user = userId;
    return await cat.save();
}

//@route GET http://localhost:5000/cats/
//@desc get all cats
//@access Private
async function getAll(userId) {
    return await catModel.find();
}


//@route GET http://localhost:5000/cats/:id
//@desc get a cat
//@access Private
async function getById(id) {
    return await catModel.findById(id);
}

//@route PATCH http://localhost:5000/cats/:id
//@desc update cats
//@access Private
async function update(id, catParam) {
    const cat = await catModel.findById(id);
    //const cat = catModel.findOneAndUpdate(id);
    console.log(cat);

    if (!cat) throw 'Cat not found.';

    Object.assign(cat, catParam);

    await cat.save();
}

//@route DELETE http://localhost:5000/cats/:id
//@desc delete cats
//@access Private
async function _delete(id) {
    await catModel.findByIdAndRemove(id);
}
