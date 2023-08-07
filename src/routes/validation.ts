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
    imp: body("imp")
      .isObject()
      .withMessage("imp must be an object")
      .notEmpty()
      .withMessage("imp cannot be empty"),
    ctype: body("ctype").notEmpty().withMessage("must send ctype").escape(),
    query: body("query")
      .isObject()
      .withMessage("query must be an object")
      .notEmpty()
      .withMessage("query cannot be empty"),
    alias: body("alias").notEmpty().withMessage("must send alias").escape(),
    ip: body("ip").notEmpty().withMessage("must send ip").escape(),
    track: body("track").notEmpty().withMessage("must send track").escape(),
    dc_ep: body("dc_ep").notEmpty().withMessage("must send dc_ep").escape(),
    query_map: body("query_map")
      .isObject()
      .withMessage("query_map must be an object")
      .notEmpty()
      .withMessage("query_map cannot be empty"),
    eps: body("eps")
      .isArray()
      .withMessage("eps must be an array")
      .notEmpty()
      .withMessage("eps cannot be empty"),
    url: body("url").notEmpty().withMessage("must send url"),

    imp_optional: body("imp")
      .optional()
      .isObject()
      .notEmpty()
      .withMessage("imp must be an object and cannot be empty"),
    ctype_optional: body("ctype")
      .optional()
      .notEmpty()
      .withMessage("must send ctype")
      .escape(),
    query_optional: body("query")
      .optional()
      .isObject()
      .withMessage("query must be an object")
      .notEmpty()
      .withMessage("query cannot be empty"),
    alias_optional: body("alias")
      .optional()
      .notEmpty()
      .withMessage("must send alias")
      .escape(),
    ip_optional: body("ip")
      .optional()
      .notEmpty()
      .withMessage("must send ip")
      .escape(),
    track_optional: body("track")
      .optional()
      .notEmpty()
      .withMessage("must send track")
      .escape(),
    dc_ep_optional: body("dc_ep")
      .optional()
      .notEmpty()
      .withMessage("must send dc_ep")
      .escape(),
    query_map_optional: body("query_map")
      .optional()
      .isObject()
      .withMessage("query_map must be an object")
      .notEmpty()
      .withMessage("query_map cannot be empty"),
    eps_optional: body("eps")
      .optional()
      .isArray()
      .withMessage("eps must be an array")
      .notEmpty()
      .withMessage("eps cannot be empty"),
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
    cmpId: query("cmpId").notEmpty().withMessage("must send cmpId"),
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
  updateCmp() {
    return [
      this.bodyValidations["_id"],
      this.bodyValidations["url"],
      this.bodyValidations["imp_optional"],
      this.bodyValidations["ctype_optional"],
      this.bodyValidations["query_optional"],
      this.bodyValidations["alias_optional"],
      this.bodyValidations["ip_optional"],
      this.bodyValidations["track_optional"],
      this.bodyValidations["dc_ep_optional"],
      this.bodyValidations["query_map_optional"],
      this.bodyValidations["eps_optional"],
    ];
  }
  getCmp() {
    return [this.queryValidations["cmpId"]];
  }
}
