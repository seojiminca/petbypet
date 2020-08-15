const productModel = require('./product.model');

module.exports = {
    getAll,
    getById
}

//@route GET http://localhost:5000/products/
//@desc get all product
//@access Public
async function getAll() {
    return await productModel.find();
}



//@route GET http://localhost:5000/products/:id
//@desc get product
//@access Public
async function getById(id) {
    return await productModel.findById(id);
}
