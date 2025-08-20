const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("helloss", "express.js");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/api"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
