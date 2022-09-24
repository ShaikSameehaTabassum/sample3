const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");

const { insertRow, getRow } = require("./catalystFunction");
const { omit, has, values, find } = require("lodash");

const bcrypt = require("bcrypt");
const passport = require("passport");
const initializaPassport = require("./passportConfig");

const crypto = require("crypto");
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
const IV = "5183666c72eec9e4"; // set random initialisation vector

var encrypt = (val) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

var decrypt = (encrypted) => {
  let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

// User-Login API
app.post("/app/login", async (req, res) => {
  const catalyst = res.locals.catalyst;
  const zcql = catalyst.zcql();
  const email_id = req.body.l_email;
  const password = req.body.l_password;
  let query, queryResponse;
  try {
    query = `SELECT UserDetails.Password FROM UserDetails WHERE UserDetails.Email = '${email_id}'`;
    console.log("Email query: ", query);
    queryResponse = await zcql.executeZCQLQuery(query);

    let dbPassword = queryResponse[0].UserDetails["Password"];
    console.log("queryResp: ", dbPassword);
    if (dbPassword) {
      let decryptedPassword = decrypt(dbPassword);

      console.log("decrypted: ", decryptedPassword);
      console.log("entered : ", password);

      if (decryptedPassword === password) {
        console.log("🚀 Logged in successfully...");
        res.status(200).send({ message: "Logged in!" });
        // res.redirect("/app/assets/templates/index.html");
      } else {
        res.status(400).send({ message: "Password incorrect!" });
      }
    } else {
      res.status(400).send({ message: "No data found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// app.get("/app/register", async (req, res) => {
//   res.render('/index.html');
// })

// User-Registration API
app.post("/app/register", async (req, res) => {
  const catalyst = res.locals.catalyst;
  const zcql = catalyst.zcql();
  const user_name = req.body.user_name;
  const email_id = req.body.email;
  const password = req.body.password;
  const confirm_pass = req.body.confirm_password;
  let query, queryResponse, userDetailInserData;

  let encryptedPassData = encrypt(password);
  let encryptedConfirmPassData = encrypt(confirm_pass);

  userDetailInserData = {
    UserName: user_name,
    Email: email_id,
    Password: encryptedPassData,
    ConfirmPassword: encryptedConfirmPassData,
  };
  console.log("User Details:", userDetailInserData);

  try {
    query = `SELECT UserDetails.ROWID FROM UserDetails WHERE UserDetails.Email = '${email_id}'`;
    queryResponse = await zcql.executeZCQLQuery(query);
    if (queryResponse.length) {
      res.status(400).send({ message: "User already exists!" });
    } else {
      if (password != confirm_pass) {
        res.status(200).send({ message: "Password mismatch!" });
      }
      insertRow(catalyst, "UserDetails", userDetailInserData).catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
      console.log("🚀 New user is created...");
      res.status(200).send({ message: "User Created" });
      // res.redirect("/app/");
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send(err);
  }
});

// Hashing password sample
app.post("/app/hash-pass", (req, res) => {
  const crypto = require("crypto");
  const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
  const IV = "5183666c72eec9e4"; // set random initialisation vector

  var encrypt = (val) => {
    let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
    let encrypted = cipher.update(val, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  };

  var decrypt = (encrypted) => {
    let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  };

  var encrypted = encrypt(req.body.text);
  var decrypted = decrypt(encrypted);

  res
    .status(200)
    .send({
      password: req.body.text,
      encrypted: encrypted,
      decrypted: decrypted,
      message: "response came!!",
    });
});

module.exports = app;
