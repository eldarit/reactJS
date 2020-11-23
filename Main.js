//backend_is main faili
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Router = require("./Router");
const bcrypt = require("bcrypt");

const saltRounds = 10;

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
db.connect(function (err) {
  if (err) {
    console.log("db_error");
    throw err;
    return false;
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 1815 * 51516 * 516,
    endConnectionOnclose: false,
  },
  db
);

app.use(
  session({
    key: "864aasdass49d4as6da4da",
    secret: "asd6asda56d2as2d6a6asdas",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1815 * 51516 * 516,
      httpOnly: false,
    },
  })
);

new Router(app, db);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/agent", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});



app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      "INSERT INTO user (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.listen(3000);
