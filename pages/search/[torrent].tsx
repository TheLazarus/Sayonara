import { GetServerSideProps, NextPage } from "next";
import { ISearchResultsProps } from "./types";
import React from "react";
import { ITorrentInformation } from "../../config/typings";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TorrentTable from "../../components/TorrentTable";

const Home: NextPage<ISearchResultsProps> = ({ torrent }) => {
  const [torrents, setTorrents] = React.useState<ITorrentInformation>([]);

  const fetchTorrents = async () => {
    const response = await fetch(
      `http://localhost:3000/api/torrent/${torrent}`
    );
    const torrentData = await response.json();
    console.log(torrentData);
    setTorrents(torrentData);
  };

  React.useEffect(() => {
    fetchTorrents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return torrents.length ? (
    <TorrentTable torrents={torrents} />
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={Boolean(!torrents.length)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
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
