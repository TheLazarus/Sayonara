import { NextApiRequest, NextApiResponse } from "next";
import endpoints from "../../../config/endpoints";
import { IFetchInformationAboutTorrent } from "../../../config/typings";

const axios = require("axios");
const puppeteer = require("puppeteer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { torrentName } = req.query;

    const pageHTML = await fetchInformationAboutTorrent(endpoints);
    res.status(200).send(pageHTML[0].html);
  }
}

const fetchInformationAboutTorrent: IFetchInformationAboutTorrent = async (
  torrentHostEndpoints
) => {
  const torrentInfo = [];
  for (let torrentHostEndpoint of torrentHostEndpoints) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${torrentHostEndpoint.url}?q=assassins+creed+2`);

    const pageHTML = (await page.evaluate(
      "new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
    )) as string;

    await browser.close();

    torrentInfo.push({
      source: torrentHostEndpoint.source,
      html: pageHTML,
    });
  }
  return torrentInfo;
};
