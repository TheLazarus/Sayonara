export type IEndpoint = {
  source: string;
  url: string;
};
export type ITorrentInfoResponse = {
  source: string;
  html: string;
};
export type IEndpoints = Array<IEndpoint>;

export type IFetchInformationAboutTorrent = (
  torrentHostEndpoints: IEndpoints
) => Promise<Array<ITorrentInfoResponse>>;
