const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json("application/json"));

app.get("/", (req, res) => res.send("Hello"));

app.post("/profile", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(5000, () => console.log("Server is running"));
