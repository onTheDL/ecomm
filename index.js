const express = require("express");

// Describes what our web servers can do
const app = express();

// ROUTE HANDLERS
app.get('/', ((req, res) => {
  res.send(`
    <div>
      <form>
        <input placeholder="email" />
        <input placeholder="password" />
        <input placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `)
}))

app.listen(3000, () => {
  console.log('Listening')
})