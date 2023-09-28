import { Request, Response } from "express";
import { validationResult } from "express-validator";
import domainManager from "../../services/name";

const buyDomain = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { domainName } = req.body;

    const resp = await domainManager.buyDomain(String(domainName));
    if (!resp) {
        return res.status(400).send("resp not found");
    } else {
        return res.status(200).json(resp);
    }
};

export default buyDomain;