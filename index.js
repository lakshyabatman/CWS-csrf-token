const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
var csrf = require("csurf");
app.use(bodyParser.urlencoded({ extended: true }));
var cons = require("consolidate");

// app.use(bodyParser.json("application/json"));
var csrfProtection = csrf({ cookie: true });
app.use(cookieParser());

app.engine("hbs", cons.handlebars);

// it defaults to 'jade'
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send(
    "<h1> CSFR Token was not present, please contact security team!</h1>"
  );
});

app.get("/", csrfProtection, (req, res) =>
  res.render("index", {
    csrfToken: req.csrfToken(),
  })
);

app.post("/profile", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(5000, () => console.log("Server is running"));
