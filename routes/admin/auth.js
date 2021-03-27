const express = require("express");
const { handleErrors } = require("./middlewares")

const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePWConfirmation,
  requireEmailExists,
  requireValidUserPassword,
} = require("./validators");
const router = express.Router();

// ROUTE HANDLERS
router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

// sanitize first, then validate
router.post(
  "/signup",
  [requireEmail, requirePassword, requirePWConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the user's cookie
    req.session.userId = user.id;

    res.send("Account created!!");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out.");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidUserPassword],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    try {
      req.session.userId = user.id;
    } catch (err) {
      res.send("Email not found")
    }
    

    res.send("You are signed in!");
  }
);

module.exports = router;
