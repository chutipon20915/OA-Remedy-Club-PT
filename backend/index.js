const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "Fullstack-Login";
const jwt = require("jsonwebtoken");

var app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "oa_xammp",
});

app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
    db.execute(
      "INSERT INTO pt (Fname, Lname, Age, Gender, Email, Password) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.Fname,
        req.body.Lname,
        req.body.Age,
        req.body.Gender,
        req.body.Email,
        hash,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

app.post("/login", jsonParser, (req, res, next) => {
  db.execute(
    "SELECT * FROM pt WHERE Email=?",
    [req.body.Email],
    function (err, pt, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (pt.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      bcrypt.compare(
        req.body.Password,
        pt[0].Password,
        function (err, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ Email: pt[0].Email }, secret, {
              expiresIn: "1h",
            });
            res
              .status(200)
              .json({ status: "ok", message: "login api success", token });
          } else {
            res.status(401).json({ status: "error", message: "login failed" });
          }
          return;
        }
      );
    }
  );
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.get("/user", function (req, res, next) {
  db.query("SELECT * FROM `ko`", function (err, results, fields) {
    res.json(results);
  });
});

app.get("/health", function (req, res, next) {
  db.query("SELECT * FROM `health`", function (err, results, fields) {
    res.json(results);
  });
});

app.get("/health/:ID", function (req, res, next) {
  db.query(
    `SELECT * FROM health WHERE ID = ${req.params.ID}`,
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.listen(5000, function () {
  console.log("Listening Localhost port 5000..");
});
