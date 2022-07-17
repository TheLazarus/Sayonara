import React from "react";
import { ITorrentInformation } from "../../config/typings";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Torrent from "../Torrent";
import styles from "./style.module.css";

type ITorrentTableProps = {
  torrents: ITorrentInformation;
};

const TorrentTable: React.FunctionComponent<ITorrentTableProps> = ({
  torrents,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100vw" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ position: "relative" }}>
                Category
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Seeders</TableCell>
              <TableCell align="center">Leechers</TableCell>
              <TableCell align="center">Upload Date</TableCell>
              <TableCell align="center">Uploader</TableCell>
              <TableCell align="center">Magnet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {torrents.map((torrent) => (
              <TableRow
                key={torrent.magnetLink}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{torrent.category}</TableCell>
                <TableCell component="th" scope="torrent">
                  {torrent.name}
                </TableCell>
                <TableCell align="center">{torrent.size}</TableCell>
                <TableCell align="center">{torrent.seeders}</TableCell>
                <TableCell align="center">{torrent.leechers}</TableCell>
                <TableCell align="center">{torrent.uploadDate}</TableCell>
                <TableCell align="center">{torrent.uploader}</TableCell>
                <TableCell align="center">magnet</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TorrentTable;
