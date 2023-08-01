import USER from "../models/user"
import { respond, missingDataRespond } from "../helpers/respond"

//a function to add user (signature and message) to the DB
export const addUser = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.telegramUsername || req.body.telegramUsername === "") {
            respond(res, 404, "body missing")
            return
        }

        const { telegramUserId, twitterUserName, twitterAcountId, telegramUsername } = req.body
        const found = await USER.findUser(telegramUserId, twitterUserName, twitterAcountId, telegramUsername)
        if (found) {
            respond(res, 404, { msg: "User Exist", found })
        } else {
            const result = await USER.addUser(req.body)
            result ? respond(res, 200, result) : respond(res, 405, "Error- user not added")
        }
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}