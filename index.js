const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

require('./models/User');

app.set('trust proxy', true);
app.use(logger('common'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {

    const devOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080'];
    const prodOrigins = ['https://app.aowebdev.com'];
    
    const allowedOrigins = process.env.NODE_ENV === 'development' ? devOrigins : prodOrigins ;
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }    

    //res.header('Access-Control-Allow-Origin', '*');

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
