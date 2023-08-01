import USER from "../models/user"
import { IUSERDocument } from "../models/interfaces/user"
import { respond, missingDataRespond } from "../helpers/respond"

export const getUser = async (req: any, res: any) => {
    try {
        if (!req.query) {
            respond(res, 404, "body missing")
            return
        }
        const { telegramUsername } = req.query
        let result: IUSERDocument | IUSERDocument[]
        result ? respond(res, 200, result) : respond(res, 405, "Error- user not found")
        return
    } catch (error: any) {
        res.status(500).json({ message: error.toString() });
    }
}