const express = require("express");
const app = express();
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
