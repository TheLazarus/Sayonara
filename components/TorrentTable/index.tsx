import React from "react";
import { ITorrentInformation } from "../../config/typings";
import Box from "@mui/material/Box";
import Torrent from "../Torrent";

type ITorrentTableProps = {
  torrents: ITorrentInformation;
};

const TorrentTable: React.FunctionComponent<ITorrentTableProps> = ({
  torrents,
}) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      {torrents.map((torrent) => (
        <Torrent torrent={torrent} key={torrent.magnetLink} />
      ))}
    </Box>
  );
};

export default TorrentTable;
