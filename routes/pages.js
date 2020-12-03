const authenticate = require('../middleware/autenticate');

// our todos
const todos = ["foo", "bar", "baz"];

module.exports = app => {
    
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' });
    });

    app.get('/secret', authenticate, (req, res) => {
        res.render('secret', { title: 'Secret', todos });
    }) 

    app.post("/todo", authenticate, (req, res) => {
        todos.push(req.body.todo);
        console.log('this is todos', todos);
        res.json(todos);
    });
    
}