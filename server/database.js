const mongoose = require('mongoose');
const chalk = require('chalk');
// Connect to MongoDB
mongoose
    .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
    )
    .catch(err => console.log(err));