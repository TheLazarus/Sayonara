import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styles from "./style.module.css";
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
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          flex: 5,
          backgroundColor: "#CFCFCF",
          borderRadius: "1em",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: "Roboto Mono",
              backgroundColor: "",
            }}
            color="text.secondary"
            gutterBottom
          >
            {torrent.category}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontFamily: "Roboto Mono" }}
          >
            {torrent.name}
          </Typography>
          <Typography
            sx={{ mb: 1.5, fontFamily: "Roboto Mono" }}
            color="text.secondary"
          >
            {torrent.size}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Roboto Mono" }}>
            Uploaded By {torrent.uploader} on {torrent.uploadDate}
            <br />
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontFamily: "Roboto Mono" }}
            color="text.secondary"
            gutterBottom
          >
            Seeders - {torrent.seeders} | Leechers - {torrent.leechers}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardContent sx={{ fontFamily: "Roboto Mono" }}>
          DOWNLOAD MAGNET
        </CardContent>
        <CardActions>
          <Button size="small">
            <a href={torrent.magnetLink}>
              <svg
                id={styles.magnetIcon}
                width="362"
                height="356"
                viewBox="0 0 362 356"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M325.899 110.898C336.469 133.142 341.558 157.541 340.756 182.128C339.954 206.715 333.284 230.803 321.282 252.452C309.281 274.101 292.283 292.706 271.659 306.769C251.035 320.831 227.361 329.957 202.544 333.412C177.726 336.867 152.46 334.555 128.779 326.661C105.098 318.767 83.6652 305.512 66.2064 287.964C48.7477 270.417 35.7512 249.067 28.264 225.634C20.7767 202.201 19.0079 177.34 23.1 153.054L92.2569 163.949C89.9582 177.591 90.9518 191.556 95.1576 204.718C99.3634 217.881 106.664 229.874 116.471 239.731C126.278 249.588 138.318 257.034 151.62 261.468C164.922 265.902 179.115 267.201 193.056 265.261C206.996 263.32 220.295 258.193 231.88 250.294C243.465 242.395 253.013 231.944 259.754 219.783C266.496 207.622 270.243 194.091 270.693 180.28C271.144 166.469 268.285 152.764 262.347 140.268L325.899 110.898Z"
                  fill="#5E5A5A"
                />
                <g style={{ mixBlendMode: "darken" }}>
                  <path
                    d="M337.305 152.745C343.321 174.486 344.497 197.242 340.755 219.47C337.012 241.698 328.439 262.876 315.617 281.566C302.795 300.256 286.024 316.021 266.444 327.789C246.864 339.557 224.933 347.053 202.141 349.768C179.35 352.483 156.23 350.353 134.353 343.523C112.477 336.693 92.3554 325.322 75.3558 310.184C58.3561 295.046 44.8765 276.495 35.8323 255.79C26.7882 235.086 22.3913 212.713 22.9405 190.191L119.918 192.447C119.702 201.314 121.433 210.123 124.994 218.274C128.555 226.426 133.862 233.73 140.555 239.69C147.248 245.65 155.17 250.127 163.783 252.816C172.396 255.505 181.499 256.344 190.472 255.275C199.446 254.206 208.08 251.255 215.789 246.621C223.498 241.988 230.101 235.781 235.149 228.423C240.198 221.064 243.573 212.726 245.047 203.974C246.52 195.223 246.057 186.263 243.689 177.704L337.305 152.745Z"
                    fill="#4F4F4F"
                  />
                </g>
                <rect
                  x="32.7555"
                  y="83.6699"
                  width="69"
                  height="64"
                  transform="rotate(9.12838 32.7555 83.6699)"
                  fill="#D9D9D9"
                />
                <rect
                  x="235"
                  y="75.9675"
                  width="69"
                  height="64"
                  transform="rotate(-23.9115 235 75.9675)"
                  fill="#D9D9D9"
                />
              </svg>
            </a>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Torrent;
