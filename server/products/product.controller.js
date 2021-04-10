const express = require("express");
const router = express.Router();
const productService = require("./product.service");

//routes
router.get("/", getAll);
router.get("/:id", getById);


module.exports = router;

//@route GET http://localhost:5000/products/
//@desc get all products
//@access Public
function getAll(req, res, next) {
  productService
    .getAll()
    .then((products) => res.json({ products: products }))
    .catch((err) => next(err));
}

//@route GET http://localhost:5000/products/:id
//@desc get a product
//@access Public
function getById(req, res, next) {
  productService
    .getById(req.params.id)
    .then((products) => res.json(products))
    .catch((err) => next(err));
}

