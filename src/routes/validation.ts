import { body } from "express-validator";

export class UserController {
  constructor() {}

  validations = {
    username: body("username")
      .notEmpty()
      .withMessage("Username is required")
      .escape(),
    email: body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .escape(),
    password: body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
  };

  checkRequestBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    next();
  }
  addUser() {
    return [
      this.validations["username"],
      this.validations["email"],
      this.validations["password"],
    ];
  }
  getUser() {
    return [this.validations["username"], this.validations["password"]];
  }
}
