const express = require('express');
const router = express.Router();
const catService = require('./cat.service');

//routes
router.post('/register', register);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

//고양이 등록.
function register(req, res, next){
    
}

//@route POST http://localhost:5000/cats/
//@desc register cats
//@access Private


//@route GET http://localhost:5000/cats/
//@desc get cats
//@access Private


//@route PATCH http://localhost:5000/cats/
//@desc update cats
//@access Private


//@route DELETE http://localhost:5000/cats/
//@desc delete cats
//@access Private
