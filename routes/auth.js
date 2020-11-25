const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

const User = mongoose.model('users');

module.exports = app => {

    app.post('/api/auth/login', (req, res) => {

      User.findOne({ login: req.body.login }, function(err, user) {

        if (err) { return res.status(403).json({ error : 'Invalid login or password'}); }

        if (!user) {
          return res.status(403).json({ error : 'Invalid login or password'});
        }

        user.validPassword(req.body.password).then( isValid => {

            if(isValid){

              const userTokenData = {
                id: user._id,
                app: user.app,
                role: user.role,
                login: user.login
              }
  
              const token = jwt.sign(userTokenData, keys.jwtKey);
              return res.json({token});
  
            }

            return res.status(403).json({ error : 'Invalid login or password'});

          },
          () => {
            return res.status(403).json({ error : 'Invalid login or password'});
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
              const {id, app, role, login } = decoded;
              return res.json({ id, app, role, login });

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
          login: req.body.login,
          app: req.body.app,
          role: req.body.role,
          password: passwordHash
        }

        User.create(userInfo).then( userDB => {
          res.send({ login: userDB.login })
        }).catch( err => res.json( { err } ) );

      } catch (error) {
        next(error);
      }      

    });
  }
    
}


