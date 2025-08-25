const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.send("helloss", "express.js");
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/api"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

//console.log("Uploads path:", path.join(__dirname, "..", "public", "uploads"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
