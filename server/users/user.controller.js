const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

//routes
router.post('/', register);
router.post('/login', login);
router.delete('/:id', checkAuth, _delete);

module.exports = router;


//@route POST http://localhost:5000/users
//@desc register
//@access Public
function register(req, res, next) {
    userService.create(req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}


//@route POST http://localhost:5000/users/login
//@desc login
//@access Public
function login(req, res, next){
    userService.login(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}



//@route DELETE http://localhost:5000/users/
//@desc delete
//@access Private
function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({message: "Deleted"}))
        .catch(err => next(err));
}



//@route GET http://localhost:5000/users/
//@desc logout
//@access Private - admin만 접근가능


//@route PATCH http://localhost:5000/users/
//@desc update password
//@access Private
