import { Request, Response } from "express";
import axios from "axios";

export const handleNewPrelander = async (req: Request, res: Response) => {
  const { geo, lang, temp } = req.query;
  try {
    await axios.get(
      `https://api.telegram.org/bot6366420776:AAGMb3lUbdR20LVFhVXlVqRQJkKgk1G0fx8/sendMessage?chat_id=-4014962239&text=geo: ${geo}%0Alang: ${lang}%0Atemplate: ${temp}%0A was updated or created`
    );
    return res.status(200).send("handleNewPrelander - completed");
  } catch (error) {
    console.log(error);
    return res.status(200).send("handleNewPrelander - failed");
  }
};
