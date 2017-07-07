const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Todo = require("./models/Todo");
const app = express();
const port = process.env.PORT || 8000;
const dbURL = "mongodb://localhost:27017/todov2";

app.use(bodyParser.json());

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to todov2 DB.");
});

app.get("/api/todos/", (req, res) => {
  Todo.find()
    .then(foundtodos => {
      res.json(foundtodos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
app.post("/api/todos", (req, res) => {
  let task = req.body;
  let newTask = new Todo(task);
  console.log("Task: ", newTask);
  newTask
    .save()
    .then(savedTask => {
      res.json(savedTask);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/todos/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(foundTodo => {
      res.json(foundTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTask => {
      res.json(updatedTask);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.patch("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTask => {
      res.json(updatedTask);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json('Record was deleted');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
