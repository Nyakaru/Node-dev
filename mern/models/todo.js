const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//to do schema
const TodoSchema = new Schema ({
    action: {
        type: String,
        required: [true]
    }
})

//to do model
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
