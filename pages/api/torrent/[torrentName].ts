import { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
import hosts from "../../../config/hosts";
import {
  ITableRows,
  ITorrent,
  ITorrentInfoResponsesFromAllHosts,
  ISourceWithRows,
  ITorrentHost,
  ITorrentHostInfo,
} from "../../../config/typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { torrentName } = req.query;

    const hTMLFromAllHosts = await getHTMLFromAllHosts(
      hosts,
      torrentName as string
    );
    const torrentRows = scrapeTorrentRowsFromHTML(hTMLFromAllHosts);
    const torrents = getTorrentsFromRows(torrentRows);
    res.status(200).send(torrents);
  }
}

const getHTMLFromAllHosts = async (
  torrentHosts: Array<ITorrentHost>,
  torrentName: string
) => {
  const torrentInfo: ITorrentInfoResponsesFromAllHosts = [];

  for (let torrentHost of torrentHosts) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${torrentHost.url}?q=${torrentName}`); //Query the Torrent Host

    const pageHTML = (await page.evaluate(
      "new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
    )) as string;

    torrentInfo.push({
      source: torrentHost.source,
      html: pageHTML,
    });
  }
  return torrentInfo;
};

const scrapeTorrentRowsFromHTML = (
  hTMLfromAllHosts: Array<ITorrentHostInfo>
) => {
  let torrentRows = hTMLfromAllHosts.map((page) => {
    const $ = cheerio.load(page.html);
    let tableRows: ITableRows = [];
    $("#torrents > tbody > tr").each((index: number, element: HTMLElement) => {
      tableRows.push($(element).html());
    });
    tableRows = tableRows.slice(1);
    return {
      source: page.source,
      tableRows,
    };
  });
  return torrentRows;
};

const getTorrentsFromRows = (torrentRows: ISourceWithRows) => {
  let torrentInformation = [];
  for (let row of torrentRows) {
    for (let trow of row.tableRows) {
      let torrent = {} as ITorrent;
      const $ = cheerio.load(trow, null, false);
      $("td").each((index: number, element: HTMLElement) => {
        switch (index) {
          case 0:
            torrent.magnetLink = cheerio.load(element)("a").attr("href");
            break;
          case 1:
            torrent.category = "";
            cheerio
              .load(element)("a")
              .each((index: number, element: HTMLElement) => {
                torrent.category = torrent.category.concat(
                  `${cheerio.load(element).text()} `
                );
              });
            break;
          case 2:
            torrent.name = cheerio.load(element)("a").text();
            break;
          case 3:
            torrent.uploadDate = cheerio.load(element).text();
            break;
          case 4:
            torrent.size = cheerio.load(element).text();
            break;
          case 5:
            torrent.seeders = cheerio.load(element).text();
            break;
          case 6:
            torrent.leechers = cheerio.load(element).text();
            break;
          case 7:
            torrent.uploader = cheerio.load(element).text();
            break;
        }
      });
      torrentInformation.push(torrent);
    }
  }
  return torrentInformation;
};
