const authenticate = require('../middleware/autenticate');

module.exports = app => {
    
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' });
    });
    
}