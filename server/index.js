//module 로드
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const passport = require('passport');
const path = require('path');

const userRouter = require("./router/users");
const catRouter = require("./router/cats");
const productRouter = require("./router/products");
const adminRouter = require("./router/admin");
const reviewRouter = require("./router/reviews");

require("./database.js");
//middleware 설정 파트
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use('/uploads/', express.static('uploads'));
require('./config/passport')(passport);
// route
app.use('/users', userRouter);
app.use('/cats', catRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.use('/reviews', reviewRouter);
if(process.env.NODE_ENV || "production" === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    next();
});
app.use(async function(err, req, res, next) {
    console.error(err.message);
    await res.status(500).json({
        error: err.message
    });
    next();
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`)); // ``로 자바스크립트 불러오기