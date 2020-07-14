const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');



//@route POST http://localhost:5000/reviews/
//@desc post reviews
//@access Private



//@route GET http://localhost:5000/reviews/
//@desc get all reviews
//@access Public


//@route GET http://localhost:5000/reviews/:id (product ID)
//@desc get specific products reviews
//@access Public


//@route GET http://localhost:5000/reviews/:id (user ID)
//@desc get specific users reviews
//@access Public


//@route PATCH http://localhost:5000/reviews/:id
//@desc update reviews
//@access Private




//@route DELETE http://localhost:5000/reviews/:id
//@desc delete reviews
//@access Private