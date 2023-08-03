const { body, validationResult } = require("express-validator");
export class UserController {
  constructor() {}
  
  checkRequestBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    next();
  }
}
