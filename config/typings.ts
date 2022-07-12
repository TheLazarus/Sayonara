export type ITorrentHost = {
  source: string;
  url: string;
};
export type ITorrentInfoResponse = {
  source: string;
  html: string;
};

export type ITorrent = {
  magnetLink: string;
  category: string;
  name: string;
  uploadDate: string;
  size: string;
  seeders: string;
  leechers: string;
  uploader: string;
};

export type ITorrentsFromSource = {
  source: string;
  torrents: ITorrentInformation;
};

export type ITorrentInformation = Array<ITorrent>;

export type ITorrentInfoResponsesFromAllHosts = Array<ITorrentInfoResponse>;

export type ITorrentHosts = Array<ITorrentHost>;

export type ITableRows = Array<string>;

export type IFetchTorrentInfoFromAllHosts = (
  torrentHostEndpoints: ITorrentHosts
) => Promise<Array<ITorrentInfoResponse>>;

export type IScrapeTorrentsFromHTML = (
  pageHTMLFromAllHosts: ITorrentInfoResponsesFromAllHosts
) => Array<ITorrentsFromSource>;
