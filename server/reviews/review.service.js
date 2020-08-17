const express = require('express');
const reviewModel = require('./review.model');


module.exports = {
    register,
    getByProductId,
    getByUserId,
    getById,
    update,
    delete: _delete
}

//@route POST http://localhost:5000/reviews/
//@desc post reviews
//@access Private
async function register(userId, reviewParam) {
    const review = new reviewModel(reviewParam);
    review.user = userId;
    return await review.save();
}


//@route GET http://localhost:5000/reviews/byProduct/:id (product ID)
//@desc get all reviews by productId
//@access Public
async function getByProductId(productId) {
    return await reviewModel.find({
      product: productId  
    });
}

//@route GET http://localhost:5000/reviews/byUser/:id (user ID)
//@desc get all reviews by userId
//@access Public
async function getByUserId(userId) {
    return await reviewModel.find({
      user: userId  
    });
}

//@route GET http://localhost:5000/reviews/:id (review ID)
//@desc get a review 프론트에서 필요없으면 지우자. 
//@access Private
async function getById(id) {
    return await reviewModel.findById(id);
}

//@route PATCH http://localhost:5000/reviews/:id
//@desc update a review
//@access Private
async function update(id, reviewParam) {
    const review = await reviewModel.findById(id);
    console.log(review);

    if (!review) throw 'Review is not found.';

    Object.assign(review, reviewParam);

    await review.save();
}


//@route DELETE http://localhost:5000/reviews/:id
//@desc delete a review
//@access Private
async function _delete(id) {
    await reviewModel.findByIdAndRemove(id);
}