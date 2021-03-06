const express = require('express');
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.CONN);

const todosSchema = {
    todo: String
}

const Todo = mongoose.model("Todo", todosSchema);

app.get('/', async(req, res) => {
    const allTodo = await Todo.find();
    res.render('index', {todosList: allTodo})
})

app.post('/add/todo', function(req, res) {
    let newTodo = new Todo({
        todo: req.body.todo
    });
    newTodo.save().then(() => {
        console.log("Successfully inserted");
        res.redirect('/');
    }).catch((err) => console.log(err));
})

app.get("/delete/todo/:_id", (req, res) => {
    const {_id} = req.params;
    Todo.deleteOne({_id}).then(() => {
        console.log("Deleted successfully");
        res.redirect("/");
    }).catch((err) => console.log(err));
})

app.listen(4000, () => console.log('Server is running'))