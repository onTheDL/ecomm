const { validationResult } = require("express-validator");

module.exports = {
  //N.B.  all middlewares that requires customization must be a fxn that returns a fxn
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }
      next();
    };
  },
  // A middleware that does not require customization
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
