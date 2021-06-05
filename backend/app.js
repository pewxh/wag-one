const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
// app.use(bodyParser.json());
const mongoose = require("mongoose");

const Post = require("./models/posts");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://pewxh:M58qUsupX2v6kQF@wag-1.xrklo.mongodb.net/wag1?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected.");
  })
  .catch(() => {
    console.log("DB connection failed.");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});
app.post("/api/posts", (req, res, next) => {
  const post = Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post Added Successfuly",
      postId: result._id,
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    req.status(200).json({
      message: "Post Updated!",
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post Fetched Succesfully",
      posts: documents,
    });
  });
});
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) req.status(200).json(post);
    else
      req.status(404).json({
        message: "Post Not Found",
      });
  });
});
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = app;
