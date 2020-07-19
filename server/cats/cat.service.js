const express = require('express');
const router = express.Router();
const catModel = require('./cat.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');


//@route POST http://localhost:5000/cats/
//@desc register cats
//@access Private


//@route GET http://localhost:5000/cats/
//@desc get cats
//@access Private


//@route PATCH http://localhost:5000/cats/
//@desc update cats
//@access Private


//@route DELETE http://localhost:5000/cats/
//@desc delete cats
//@access Private
