import { NextApiRequest, NextApiResponse } from "next";
import hosts from "../../../config/hosts";
import {
  IFetchTorrentInfoFromAllHosts,
  ITorrentInfoResponsesFromAllHosts,
} from "../../../config/typings";

const axios = require("axios");
const puppeteer = require("puppeteer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { torrentName } = req.query;

    const pageHTMLFromAllHosts = await fetchTorrentInfoFromAllHosts(hosts);
    res.status(200).send(pageHTMLFromAllHosts[0].html);
  }
}

const fetchTorrentInfoFromAllHosts: IFetchTorrentInfoFromAllHosts = async (
  torrentHosts
) => {
  const torrentInfo: ITorrentInfoResponsesFromAllHosts = [];

  for (let torrentHost of torrentHosts) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${torrentHost.url}?q=assassins+creed+2`); //Query the Torrent Host

    const pageHTML = (await page.evaluate(
      "new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
    )) as string;

    await browser.close();

    torrentInfo.push({
      source: torrentHost.source,
      html: pageHTML,
    });
  }
  return torrentInfo;
};
