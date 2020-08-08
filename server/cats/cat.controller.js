const express = require('express');
const router = express.Router();
const catService = require('./cat.service');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

//routes
router.post('/', checkAuth, register);
router.get('/', checkAuth, getAll);
router.get('/:id', checkAuth, getById);
//router.put('/:id', update);
//router.delete('/:id', _delete);

module.exports = router;

//@route POST http://localhost:5000/cats/
//@desc register cats
//@access Private
function register(req, res, next){
    const userId = req.user.id;
    catService.register(userId, req.body)
      //.then(() => res.json({message:"success!"}))
      .then(cat => res.json(cat))
      .catch(err => next(err));
}

//@route GET http://localhost:5000/cats/
//@desc get all cats
//@access Private
function getAll(req, res, next) {
  const userId =req.user.id;
  catService.getAll(userId)
    .then(cats => res.json(cats))
    .catch(err => next(err));
}


//@route GET http://localhost:5000/cats/:id
//@desc get a cat
//@access Private
function getById(req, res, next) {
  catService.getById(res.params.id)
    .then
}

//@route PATCH http://localhost:5000/cats/:id
//@desc update cats
//@access Private


//@route DELETE http://localhost:5000/cats/:id
//@desc delete cats
//@access Private
