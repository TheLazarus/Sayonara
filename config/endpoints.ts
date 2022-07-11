type IEndpoint = {
  id: string;
  url: string;
};

type IEndpoints = Array<IEndpoint>;

const endpoints: IEndpoints = [
  {
    id: "piratesbay",
    url: "proxifiedpiratebay.org/search.php",
  },
];

export default endpoints;
