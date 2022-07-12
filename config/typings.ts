export type IEndpoint = {
  id: string;
  url: string;
};

export type IEndpoints = Array<IEndpoint>;

export type IFetchInformationAboutTorrent = (
  torrentHostEndpoints: IEndpoints
) => void;
