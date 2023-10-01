import { Request, Response } from "express";
import { validationResult } from "express-validator";
import domainManager from "../../services/name";
import { route53Manager } from "../../services/aws-route53";

export const createHostedZone = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { domainName } = req.body;
        const resp = await route53Manager.createHostedZone(domainName)
        console.log(resp);
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(400).send("failed to create hosted zone");
    }
};

export const createRecordInHostedZone = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { domainName } = req.body;
        const subdomains = [
            `${domainName}`,
            `www.${domainName}`,
            `bca.${domainName}`,
            `bge.${domainName}`,
            `bit.${domainName}`,
            `bmx.${domainName}`,
            `trac.${domainName}`,
            `tail.${domainName}`,
            `seek.${domainName}`,
            `hunt.${domainName}`,
        ];
        for (let index = 0; index < subdomains.length; index++) {
            const element = subdomains[index];
            await route53Manager.createRecordInHostedZone(domainName, element);
        }
        return res.status(200).send("created aliases");
    } catch (error) {
        return res.status(400).send("failed to create aliases");
    }
};

