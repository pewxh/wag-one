const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
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
