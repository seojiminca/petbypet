const express = require('express');
const reviewModel = require('./review.model');

module.exports = {
  register,
  getByProductId,
  getByUserId,
  getById,
  update,
  delete: _delete,
};

//@route POST http://localhost:5000/reviews/
//@desc post reviews
//@access Private
async function register(userId, reviewParam) {
  const review = new reviewModel(reviewParam);
  review.user = userId;
  return await review.save();
}

//@route GET http://localhost:5000/reviews/:id (product ID)
//@desc get specific products reviews
//@access Public
async function getByProductId(productId) {
  return await reviewModel.find({
    product: productId,
  });
}

//@route GET http://localhost:5000/reviews/:id (user ID)
//@desc get specific users reviews
//@access Public
async function getByUserId(userId) {
  return await reviewModel.find({
    user: userId,
  });
}

//@route GET http://localhost:5000/reviews/:id (review ID)
//@desc get specific reviews
//@access Private
async function getById(id) {
  return await reviewModel.findById(id);
}

//@route PATCH http://localhost:5000/reviews/:id
//@desc update reviews
//@access Private
async function update(id, reviewParam) {
  const review = await reviewModel.findById(id);
  console.log(review);

  if (!review) throw 'Review not found.';

  Object.assign(review, reviewParam);

  await review.save();
}

//@route DELETE http://localhost:5000/reviews/:id
//@desc delete reviews
//@access Private
async function _delete(id) {
  await reviewModel.findByIdAndRemove(id);
}
