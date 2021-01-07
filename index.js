const path = require('path');
const createError = require('http-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

require('./models/User');

// Settings

app.set('trust proxy', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware

app.use(logger('common'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
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

// Routes

require('./routes/pages')(app);
require('./routes/auth')(app);
require('./routes/todo')(app);
require('./routes/uploads')(app);

// Error heandlears

app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // console.log(req.originalUrl)

  if(err.status === 401){
    return res.redirect('/');
  }

  res.status(err.status || 500);
  res.render('error');
});

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
