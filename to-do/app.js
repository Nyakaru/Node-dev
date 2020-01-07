const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

//set up express app
const app = express();

//log request to the console
app.use(logger('dev'));

//parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes into the application
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome lets do this'
}));

module.exports = app;
