import { NextApiRequest, NextApiResponse } from "next";
import hosts from "../../../config/hosts";
import {
  IFetchTorrentInfoFromAllHosts,
  IScrapeMagnetsFromHTML,
  ITableRows,
  ITorrentInfoResponsesFromAllHosts,
} from "../../../config/typings";

const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { torrentName } = req.query;

    const pageHTMLFromAllHosts = await fetchTorrentInfoFromAllHosts(hosts);
    scrapeMagnetsFromHTML(pageHTMLFromAllHosts);

    res.status(200).send(pageHTMLFromAllHosts[0].html);
  }
}

const scrapeMagnetsFromHTML: IScrapeMagnetsFromHTML = (
  pageHTMLfromAllHosts
) => {
  let torrentMagnets = pageHTMLfromAllHosts.map((pageHTML) => {
    const $ = cheerio.load(pageHTML.html);
    let tableRows: ITableRows = [];
    $("#torrents > tbody > tr").each((index: string, element: any) => {
      tableRows.push($(element).html());
    });
    tableRows = tableRows.slice(1);
    console.log(tableRows);
  });
};

const fetchTorrentInfoFromAllHosts: IFetchTorrentInfoFromAllHosts = async (
  torrentHosts
) => {
  const torrentInfo: ITorrentInfoResponsesFromAllHosts = [];

  for (let torrentHost of torrentHosts) {
    const browser = await puppeteer.launch(
      "C:Program FilesGoogleChromeApplicationchrome.exe"
    );
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
