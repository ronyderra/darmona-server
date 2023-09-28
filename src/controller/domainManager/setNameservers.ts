import { Request, Response } from "express";
import { validationResult } from "express-validator";
import domainManager from "../../services/name";

const setNameservers = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { domainName, nameservers } = req.body;

    const resp = await domainManager.setNameservers(String(domainName), nameservers);
    if (!resp) {
        return res.status(400).send("resp not found");
    } else {
        return res.status(200).json(resp);
    }
};

export default setNameservers;