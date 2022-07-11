import { NextApiRequest, NextApiResponse } from "next";
import endpoints from "../../../config/endpoints";
const axios = require("axios");
const cheerio = require("cheerio");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { torrentName } = req.query;

    res.status(200).json({ torrent: torrentName });
  }
}
