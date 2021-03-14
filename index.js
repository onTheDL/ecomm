const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");
// Describes what our web servers can do
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTE HANDLERS
app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

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

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  // Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password })

  // Store the id of that user inside the user's cookie


  res.send("Account created!!");
});

app.listen(3000, () => {
  console.log("Listening");
});
