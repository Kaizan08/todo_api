var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;