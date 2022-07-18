import { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
import hosts from "../../../config/hosts";
import {
  ITorrent,
  ISourceWithRows,
  ITorrentHostInfo,
} from "../../../config/typings";
import getHTMLFromAllHosts from "../../../utils/getHTMLFromAllHosts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { torrentName, category } = req.query;

    const hTMLFromAllHosts = await getHTMLFromAllHosts(
      hosts,
      torrentName as string,
      category as string
    );
    const torrentRows = await scrapeTorrentRowsFromHTML(hTMLFromAllHosts);
    const torrents = getTorrentsFromRows(torrentRows);
    res.status(200).send(torrents);
  }
}

const scrapeTorrentRowsFromHTML = (
  hTMLfromAllHosts: Array<ITorrentHostInfo>
) => {
  let torrentRows = hTMLfromAllHosts.map((page) => {
    const $ = cheerio.load(page.html);
    let tableRows: Array<string> = [];
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
