const puppeteer = require("puppeteer");
import {
  ITorrentHost,
  ITorrentInfoResponsesFromAllHosts,
} from "../config/typings";

const getHTMLFromAllHosts = async (
  torrentHosts: Array<ITorrentHost>,
  torrentName: string,
  category: string
) => {
  const torrentInfo: ITorrentInfoResponsesFromAllHosts = [];

  for (let torrentHost of torrentHosts) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${torrentHost.url}?q=${torrentName}&cat=${category}`); //Query the Torrent Host

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
export default getHTMLFromAllHosts;
