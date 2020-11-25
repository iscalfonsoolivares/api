const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
// const auth = keys.auth || '';
// const email = auth.split(':')[0];
// const password = auth.split(':')[1];

const User = mongoose.model('users');

module.exports = app => {

    app.post('/api/auth/login', (req, res) => {

      User.findOne({ username: req.body.username }, function(err, user) {

        if (err) { return res.status(403).json({ error : 'Invalid username or password'}); }

        if (!user) {
          return res.status(403).json({ error : 'Invalid username or password'});
        }

        user.validPassword(req.body.password).then( isValid => {

            if(isValid){

              const userTokenData = {
                id: user._id,
                userName: user.username
              }
  
              const token = jwt.sign(userTokenData, keys.jwtKey);
              return res.json({token});
  
            }

            return res.status(403).json({ error : 'Invalid username or password'});

          },
          () => {
            return res.status(403).json({ error : 'Invalid username or password'});
          }          
        )

      });

  });

  app.post('/api/auth/user', (req, res) => {

      const bearerHeader = req.headers['authorization'];

      if (bearerHeader) {

          const bearer = bearerHeader.split(' ');
          const token = bearer[1]
      
          jwt.verify(token, keys.jwtKey, function(err, decoded ) {

              if(err){
                  return res.status(403).json({ error : err});
              }
              const {id, userName } = decoded;
              return res.json({ id, userName });

          });

      }else{
          return res.status(403).json({ error : 'Missing token'});
      }
      
  });

    
  if(process.env.NODE_ENV === 'development'){
    app.post('/api/auth/register', async (req, res) => {

      try {      

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const userInfo = {
          username: req.body.username,
          password: passwordHash
        }

        User.create(userInfo).then( userDB => {
          res.send({ username: userDB.username })
        }).catch( err => res.json( { err } ) );

      } catch (error) {
        next(error);
      }      

    });
  }
    
}


