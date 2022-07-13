import { GetServerSideProps, NextPage } from "next";
import { ISearchPageProps } from "./types";
import React from "react";
import { ITorrentInformation } from "../../config/typings";

const Home: NextPage<ISearchPageProps> = ({ torrent }) => {
  const [torrents, setTorrents] = React.useState<Array<ITorrentInformation>>(
    []
  );

  const fetchTorrents = async () => {
    const response = await fetch(
      `http://localhost:3000/api/torrent/${torrent}`
    );
    const data = await response.json();
    console.log(data);
    setTorrents(data);
  };

  React.useEffect(() => {
    fetchTorrents();
  }, []);

  return <main>{JSON.stringify(torrents)}</main>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { torrent } = context.query;
  return {
    props: {
      torrent,
    },
  };
};

export default Home;
