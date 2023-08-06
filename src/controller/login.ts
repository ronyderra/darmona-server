import { validationResult } from "express-validator";
import { config } from "dotenv";
import USER from "../models/user";
import jwt from "jsonwebtoken";
config();

const login = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = await USER.findUser(username, password);
    if (user) {
      const token = jwt.sign(req.body, process.env.BEARER, { expiresIn: "24h" });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(200).send(user);
    }
    res.status(400).send("Not Found");
  } catch (e: any) {
    res.status(500).json({ message: e.toString() });
  }
};
export default login;