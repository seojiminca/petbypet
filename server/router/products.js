const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');


//@route GET http://localhost:5000/products/
//@desc get all product
//@access Public




//@route GET http://localhost:5000/products/:id
//@desc get product
//@access Public



