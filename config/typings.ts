export type ITorrentHost = {
  source: string;
  url: string;
};
export type ITorrentInfoResponse = {
  source: string;
  html: string;
};
export type ITorrentInfoResponsesFromAllHosts = Array<ITorrentInfoResponse>;

export type ITorrentHosts = Array<ITorrentHost>;

export type IFetchTorrentInfoFromAllHosts = (
  torrentHostEndpoints: ITorrentHosts
) => Promise<Array<ITorrentInfoResponse>>;
