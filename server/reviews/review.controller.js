const express = require('express');
const router = express.Router();
const reviewService = require('./review.service');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

//routes
router.post('/post', checkAuth, register);
router.get('/byProduct', getByProductId);
router.get('/byUser', getByUserId);
router.get('/:id', checkAuth, getById);
router.patch('/:id', checkAuth, update);
router.delete('/:id', checkAuth, _delete);

module.exports = router;

//@route POST http://localhost:5000/reviews/post
//@desc post reviews
//@access Private
function register(req, res, next) {
    const userId = req.user.id;

    reviewService.register(userId, req.body)
        //.then(() => res.json({message:"success!"}))
        .then(review => res.json(review))
        .catch(err => next(err));
}


//@route GET http://localhost:5000/reviews/:id (product ID)
//@desc get specific products reviews
//@access Public
function getByProductId(req, res, next) {
    const productId = req.param.id;
    reviewService.getByProductId(productId)
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}

//@route GET http://localhost:5000/reviews/:id (user ID)
//@desc get specific users reviews
//@access Public
function getByUserId(req, res, next) {
    const userId = req.user.id;
    reviewService.getByProductId(userId)
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}

//@route GET http://localhost:5000/reviews/:id (review ID)
//@desc get specific reviews
//@access Private
function getById(req, res, next) {
    reviewService.getByProductId(req.param.id)
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}

//@route PATCH http://localhost:5000/reviews/:id
//@desc update reviews
//@access Private
function update(req, res, next) {
    reviewService.update(req.params.id, req.body)
        .then(() => res.json({message: "Updated"}))
        .catch(err => next(err));
}


//@route DELETE http://localhost:5000/reviews/:id
//@desc delete reviews
//@access Private
function _delete(req, res, next) {
    reviewService.delete(req.params.id)
        .then(() => res.json({message: "Deleted"}))
        .catch(err => next(err));
}
