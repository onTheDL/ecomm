const { validationResult } = require("express-validator");

module.exports = {
  //N.B.  all middlewares that requires customization must be a fxn that returns a fxn
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {

        // Using '...' prevents from spreading an undefined value (ln 16)
        let data = {};
        if (dataCb) {
          data = await dataCb(req)
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
  // A middleware that does not require customization does not need to return a fxn
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
