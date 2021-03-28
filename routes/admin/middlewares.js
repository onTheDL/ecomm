const { validationResult } = require("express-validator");

module.exports = {

  //N.B.  all middlewares must be a fxn that returns a fxn
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }
      next();
    };
  },
};
