const express = require("express");
const bodyParser = require("body-parser"); // a middleware fxn
const cookieSession = require("cookie-session"); // a middleware fxn
const authedRouter = require("./routes/admin/auth");

// Describes what our web servers can do
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

/*
// Middleware
const bodyParser = (req, res, next) => {
  // get access to email, password, passwordConfirmation
  // on = an event listener

  if (req.method === "POST") {
    req.on("data", (data) => {
      const parsed = data.toString("utf8").split("&");
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split("=");
        formData[key] = value;
      }
      req.body = formData
      next()
    });
  } else next()
};
*/

app.use(
  cookieSession({
    keys: ["fsadflj233j"],
  })
);

app.use(authedRouter);

app.listen(3000, () => {
  console.log("Listening");
});
