import { validationResult } from "express-validator";
import { config } from "dotenv";
import USER, { IUSER } from "../models/user";
import jwt from "jsonwebtoken";
import CMP, { ICMP } from "../models/cmps";
import { ObjectId } from "mongodb";
config();

interface RUSER extends IUSER {
  cmps: ICMP[];
}

const login = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    let user = await USER.findUser(username, password);

    if (user) {
      const cmps: ICMP[] = await CMP.getCmpsByUser(new ObjectId(user._id));
      user.cmps = cmps;
      const token = jwt.sign(req.body, process.env.BEARER, { expiresIn: "24h" });
      const expirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const expirationDate = new Date(Date.now() + expirationMs);
      res.cookie("jwt", token, {
        httpOnly: false,
        secure: true,
        domain: '.darmona.org',
        sameSite: "none",
        expires: expirationDate,
      });

      return res.status(200).send(user);
    }
    res.status(400).send("Not Found");
  } catch (e: any) {
    res.status(500).json({ message: e.toString() });
  }
};
export default login;
