import { body, query } from "express-validator";

export class UserController {
  constructor() {}

  bodyValidations = {
    _id: body("_id")
      .isLength({ min: 6 })
      .withMessage("_id must be at least 6 characters long")
      .escape(),
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
    imp: body("alias").notEmpty().withMessage("nust send alias").escape(),
    ctype: body("alias").notEmpty().withMessage("nust send alias").escape(),
    query: body("query").notEmpty().withMessage("nust send query").escape(),
    alias: body("alias").notEmpty().withMessage("nust send alias").escape(),
    ip: body("ip").notEmpty().withMessage("nust send ip").escape(),
    track: body("track").notEmpty().withMessage("nust send track").escape(),
    dc_ep: body("dc_ep").notEmpty().withMessage("nust send dc_ep").escape(),
    query_map: body("query_map")
      .notEmpty()
      .withMessage("nust send query_map")
      .escape(),
    eps: body("eps").notEmpty().withMessage("nust send eps").escape(),
  };
  queryValidations = {
    username: query("username")
      .notEmpty()
      .withMessage("Username is required")
      .escape(),
    email: query("email")
      .isEmail()
      .withMessage("Invalid email address")
      .escape(),
    password: query("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
    _id: query("_id")
      .isLength({ min: 6 })
      .withMessage("_id must be at least 6 characters long")
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
      this.bodyValidations["username"],
      this.bodyValidations["email"],
      this.bodyValidations["password"],
    ];
  }
  getUser() {
    return [this.queryValidations["_id"]];
  }
  login() {
    return [this.bodyValidations["username"], this.bodyValidations["password"]];
  }
  updateUser() {
    return [this.bodyValidations["_id"]];
  }
  addCmp() {
    return [
      this.bodyValidations["_id"],
      this.bodyValidations["imp"],
      this.bodyValidations["ctype"],
      this.bodyValidations["query"],
      this.bodyValidations["alias"],
      this.bodyValidations["ip"],
      this.bodyValidations["track"],
      this.bodyValidations["dc_ep"],
      this.bodyValidations["query_map"],
      this.bodyValidations["eps"],
    ];
  }
}
