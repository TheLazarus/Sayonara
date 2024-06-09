export type ITorrentHost = {
  source: string;
  url: string;
};
export type ITorrentHostInfo = {
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

export type ITorrentsFromHost = {
  source: string;
  torrents: ITorrentInformation;
};

export type ISourceWithRow = {
  source: string;
  tableRows: Array<string>;
};
export type ITorrentInformation = Array<ITorrent>;

export type ITorrentInfoResponsesFromAllHosts = Array<ITorrentHostInfo>;

export type ITorrentHosts = Array<ITorrentHost>;

export type ISourceWithRows = Array<ISourceWithRow>;
