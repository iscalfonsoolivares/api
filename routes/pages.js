const authenticate = require('../middleware/autenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' });
    });

    app.get('/secret', authenticate, (req, res) => {
        console.log('this is the great user', req.user.id);
        res.render('secret', { title: 'Secret' });
    }) 
}