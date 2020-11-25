const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

require('./models/User');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

require('./routes/auth')(app);

const conectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoDbUrl, conectionOptions ).then(
  () => {
    console.log('App has conected to the DB.')
    app.listen(port, () => console.log('App is running in port', port, 'on', process.env.NODE_ENV, 'mode.' ));    
  },
  err => {
    console.log(err);
  }
);
