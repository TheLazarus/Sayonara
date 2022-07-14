import React from "react";
import { ITorrent } from "../../config/typings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

type ITorrentProps = {
  torrent: ITorrent;
};

const Torrent: React.FunctionComponent<ITorrentProps> = ({ torrent }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{torrent.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default Torrent;
