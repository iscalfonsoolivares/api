const authenticate = require('../middleware/autenticate');

// our todos
const todos = ["foo", "bar", "baz"];

module.exports = app => {

    app.get('/secret', authenticate, (req, res) => {
        res.render('secret', { title: 'Secret', todos });
    }); 
    
    app.post("/api/todo", authenticate, (req, res) => {
        todos.push(req.body.todo);
        res.json(todos);
    });

}