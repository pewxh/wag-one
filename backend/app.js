const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post Added Successfuly",
  });
});
app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "id0001",
      title: "First Post",
      content: "Hello hello hello",
    },
    {
      id: "id0002",
      title: "Second Post",
      content: "This is second post",
    },
  ];
  res.status(200).json({
    message: "Post Fetched Succesfully",
    posts: posts,
  });
});

module.exports = app;
