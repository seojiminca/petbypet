const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../validation/login')
const passport = require('passport');


//@route GET http://localhost:5000/admin/
//@desc get all user
//@access Private



//@route POST http://localhost:5000/products/
//@desc post products
//@access Private


//@route PATCH http://localhost:5000/products/:id
//@desc update product
//@access Private



//@route DELETE http://localhost:5000/products/:id
//@desc delete product
//@access Private

