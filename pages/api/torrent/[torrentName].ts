import { NextApiRequest, NextApiResponse } from "next";
import hosts from "../../../config/hosts";
import {
  IFetchTorrentInfoFromAllHosts,
  IScrapeTorrentsFromHTML,
  ITableRows,
  ITorrent,
  ITorrentInfoResponsesFromAllHosts,
  ITorrentInformation,
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
    const torrents = scrapeTorrentsFromHTML(pageHTMLFromAllHosts);

    res.status(200).json(torrents);
  }
}

const scrapeTorrentsFromHTML: IScrapeTorrentsFromHTML = (
  pageHTMLfromAllHosts
) => {
  let torrents = pageHTMLfromAllHosts.map((page) => {
    let torrentInformation: ITorrentInformation = [];
    const $ = cheerio.load(page.html);
    let tableRows: ITableRows = [];
    $("#torrents > tbody > tr").each((index: number, element: HTMLElement) => {
      tableRows.push($(element).html());
    });
    tableRows = tableRows.slice(1);
    for (let row of tableRows) {
      let torrent = {} as ITorrent;
      const $ = cheerio.load(row, null, false);
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
    return {
      source: page.source,
      torrents: torrentInformation,
    };
  });
  return torrents;
};

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

    await page.close();
    await browser.close();

    torrentInfo.push({
      source: torrentHost.source,
      html: pageHTML,
    });
  }
  return torrentInfo;
};
