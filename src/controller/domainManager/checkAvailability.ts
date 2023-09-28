import { Request, Response } from "express";
import { validationResult } from "express-validator";
import domainManager from "../../services/name";

const checkAvailability = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { domainName } = req.query;

    const resp = await domainManager.checkAvailability(String(domainName));
    if (!resp) {
        return res.status(400).send("resp not found");
    } else {
        return res.status(200).json(resp);
    }
};

export default checkAvailability;