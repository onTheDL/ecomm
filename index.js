const express = require("express");

// Describes what our web servers can do
const app = express();

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

app.post("/", (req, res) => {
  // get access to email, password, passwordConfirmation

  // on = an event listener
  req.on("data", (data) => {
    const parsed = data.toString("utf8").split("&");
    const formData = {};
    for (let pair of parsed) {
      const [key, value] = pair.split("=");
      formData[key] = value;
    }
    console.log(formData);
  });

  res.send("Account created!!");
});

app.listen(3000, () => {
  console.log("Listening");
});
