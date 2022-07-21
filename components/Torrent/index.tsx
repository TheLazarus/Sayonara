import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { ITorrent } from "../../config/typings";

type ITorrentProps = {
  torrent: ITorrent;
};

const Torrent: React.FunctionComponent<ITorrentProps> = ({ torrent }) => {
  return (
    <Box
      sx={{
        width: "90vw",
        display: "flex",
        gap: "1em",
      }}
    >
      <Card
        sx={{
          flex: 5,
          backgroundColor: "#FFFCE8",
          borderRadius: "1em",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {torrent.category}
          </Typography>
          <Typography variant="h5" component="div">
            {torrent.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {torrent.size}
          </Typography>
          <Typography variant="body2">
            Uploaded By {torrent.uploader} on {torrent.uploadDate}
            <br />
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Seeders - {torrent.seeders} | Leechers - {torrent.leechers}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">
            <a href={torrent.magnetLink}>MAGNET</a>
          </Button>
        </CardActions> */}
      </Card>
      <Card sx={{ flex: 1, borderRadius: "1em", backgroundColor: "#CD5334" }}>
        <CardContent>MAGNET</CardContent>
        <CardActions>
          <Button size="small">
            <a href={torrent.magnetLink}>MAGNET</a>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Torrent;
