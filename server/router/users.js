const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const passport = require('passport');

//@route POST http://localhost:5000/users
//@desc sign up
//@access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  userModel
    .findOne({email})
    .exec()
    .then(user => {
      if(user) {
        return res.json("email already exists.");
      }

      const newUser = new userModel({
          name: name,
          email: email,
          password: password
      });

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



//@route GET http://localhost:5000/users/
//@desc sign in
//@access Private - admin만 접근가능


//@route GET http://localhost:5000/users/
//@desc logout
//@access Private - admin만 접근가능


//@route GET http://localhost:5000/api/users/
//@desc 
//@access Private - admin만 접근가능


module.exports = router;