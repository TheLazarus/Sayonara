import { GetServerSideProps, NextPage } from "next";
import { ISearchPageProps } from "./types";
import React from "react";
import { ITorrentInformation } from "../../config/typings";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TorrentTable from "../../components/TorrentTable";

const Home: NextPage<ISearchPageProps> = ({ torrent }) => {
  const [torrents, setTorrents] = React.useState<ITorrentInformation>([]);

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
