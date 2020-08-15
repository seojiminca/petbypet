require('dotenv').config();
const express = require('express');
const passport = require('passport');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const webpackConfig = require('../webpack.config');

const userRouter = require('./users/user.controller');
const catRouter = require('./cats/cat.controller');
const productRouter = require('./products/product.controller');
const reviewRouter = require('./reviews/review.controller');
//const adminRouter = require('./admin/admin');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./database');
require('../config/passport')(passport);

//route
app.use('/users', userRouter);
app.use('/cats', catRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
//app.use('/admin', adminRouter);


// if development
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(
    historyApiFallback({
      verbose: false
    })
  );
  app.use(
    webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
    )}`
  );
});
