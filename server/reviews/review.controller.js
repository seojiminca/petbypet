const express = require('express');
const router = express.Router();
const reviewService = require('./review.service');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

//routes
router.post('/', checkAuth, register);
router.get('/byProduct/:id', getByProductId);
router.get('/byUser/:id', getByUserId);
router.get('/:id', getById);
router.patch('/:id', checkAuth, update);
router.delete('/:id', checkAuth, _delete);

module.exports = router;

//@route POST http://localhost:5000/reviews/
//@desc post reviews
//@access Private
function register(req, res, next) {
    const userId = req.user.id;

    reviewService.register(userId, req.body)
        //.then(() => res.json({message:"success!"}))
        .then(review => res.json(review))
        .catch(err => next(err));
}


//@route GET http://localhost:5000/reviews/byProduct/:id (product ID)
//@desc get all reviews by productId
//@access Public
function getByProductId(req, res, next) {
    reviewService.getByProductId(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}

//@route GET http://localhost:5000/reviews/byUser/:id (user ID)
//@desc get all reviews by userId
//@access Public
function getByUserId(req, res, next) {
    reviewService.getByUserId(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
}

//@route GET http://localhost:5000/reviews/:id (review ID)
//@desc get a review. 프론트에서 필요없으면 지우자. 
//@access Private
function getById(req, res, next) {
    reviewService.getById(req.params.id)
        .then(review => res.json(review))
        .catch(err => next(err));
}

//@route PATCH http://localhost:5000/reviews/:id
//@desc update a review
//@access Private
function update(req, res, next) {
    reviewService.update(req.params.id, req.body)
        .then(() => res.json({message: "Updated"}))
        .catch(err => next(err));
}


//@route DELETE http://localhost:5000/reviews/:id
//@desc delete a review
//@access Private
function _delete(req, res, next) {
    reviewService.delete(req.params.id)
        .then(() => res.json({message: "Deleted"}))
        .catch(err => next(err));
}