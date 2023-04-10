import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import substituteImg from "../assets/no-image-available-sm.png";

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "20px",
        },
      },
    },
  },
});

const MovieCard = ({ item, color, starColor }) => {
  return (
    <Grid xs={12} sm={6} md={4} lg={3} className="slide-in">
      <Link to={`/movie/${item?.id}`}>
        <CardMedia
          component="img"
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
              : substituteImg
          }
          sx={{
            maxWidth: "200px",
            maxHeight: "300px",
            m: "0 auto",
            borderRadius: "10px",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Tooltip title={item?.title} followCursor>
              <Typography
                variant="h5"
                alignItems="center"
                sx={{
                  mb: "5px",
                  width: "220px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  color,
                }}
              >
                {item?.title}
              </Typography>
            </Tooltip>
          </ThemeProvider>
          <Tooltip title={item?.vote_average}>
            <span>
              <Rating
                value={item?.vote_average / 2}
                precision={0.25}
                sx={{
                  "& .MuiRating-decimal": {
                    "& .MuiRating-icon": {
                      "& .MuiSvgIcon-root": {
                        color: starColor,
                      },
                    },
                  },
                }}
                readOnly
              />
            </span>
          </Tooltip>
        </CardContent>
      </Link>
    </Grid>
  );
};

export default MovieCard;
