const express = require("express");
const bodyParser = require("body-parser"); // a middleware fxn
const cookieSession = require("cookie-session"); // a middleware fxn
const authedRouter = require("./routes/admin/auth");

// Describes what our web servers can do
const app = express();

// MIDDLEWARES
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ["fsadflj233j"],
  })
);

app.use(authedRouter);

app.listen(3000, () => {
  console.log("Listening");
});
