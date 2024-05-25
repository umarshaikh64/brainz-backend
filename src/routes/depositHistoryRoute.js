const { body, validationResult } = require("express-validator");
const { activityTypeValidation } = require("../validators/userValidators");
const express = require("express");
const router = express.Router();

router.post(
  "/create_record",
  [
    activityTypeValidation,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ],
  createHistory
);

router.get("/deposit_history", depositHistory);

module.exports = router;
