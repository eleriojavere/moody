// index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 2022;
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({
    min: 6,
  }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    if (validUser(req.body.email, req.body.password)) {
      return res.status(200).json({
        token: generateAccessToken(req.body.email),
      });
    } else {
      return res.status(401).json({
        success: false,
        errors: errors.array,
      });
    }
  }
);

app.listen(port);

const validUser = (email, password) => {
  if (email === "test@test.ee" && password === "testtest") return true;
  else return false;
};

const generateAccessToken = (email) => {
  const token = require("crypto").randomBytes(64).toString("hex");
  return jwt.sign(email, token);
};

console.log("Port running at:  http://localhost:" + port);
