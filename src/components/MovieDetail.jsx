import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Rating,
  Button,
  Paper,
  Modal,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";

import { genres } from "../utils/constant";
import substituteImg from "../assets/no-image-available-sm.png";

import { selectDarkTheme } from "../redux/features/DarkThemeSlice";

import {
  useGetMovieQuery,
  useGetMovieRecommendationsQuery,
} from "../redux/services/MovieApi";

import MovieCard from "./MovieCard";
import Loader from "./Spinner";
import { useMovieGenreUpdate } from "./MoviesTypesContext";

const MovieDetail = () => {
  const [open, setOpen] = useState(false);
  const handleVideoClose = () => {
    setOpen(false);
  };
  const handleVideoOpen = () => {
    setOpen(!open);
  };
  const { id } = useParams();
  const darkTheme = useSelector(selectDarkTheme);
  const handleMoviesGenresChange = useMovieGenreUpdate();

  const {
    data: movieInfo,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMovieQuery(id);
  const { data: recommendations } = useGetMovieRecommendationsQuery(id);
  const movieGenre = (() =>
    genres.filter(
      (genre) =>
        movieInfo?.genres.map((genreId) => genreId.id).indexOf(genre.id) >= 0
    ))();

  const moviePageBtn = [
    {
      name: "WEBSITE",
      link: movieInfo?.homepage ? movieInfo?.homepage : null,
      icon: <LanguageIcon className="movieDetail-btn" />,
    },
    {
      name: "IDMB",
      link: `https://www.imdb.com/title/${movieInfo?.imdb_id}`,
      icon: <MovieIcon className="movieDetail-btn" />,
    },
  ];

  let content;

  if (isFetching) {
    content = <Loader darkTheme={darkTheme} />;
  } else if (isSuccess) {
    content = (
      <Grid container sx={{ m: 0, color: darkTheme ? "#fff" : "" }}>
        <Grid
          xs={12}
          lg={4}
          sx={{
            display: { xs: "flex" },
            justifyContent: { xs: "center" },
            mb: { xs: "20px" },
          }}
        >
          <Paper
            component="img"
            src={
              movieInfo?.poster_path
                ? `https://image.tmdb.org/t/p/w500//${movieInfo?.poster_path}`
                : substituteImg
            }
            alt="poster"
            elevation={3}
            sx={{
              width: { xs: "200px", sm: "300px" },
              height: { xs: "300px", sm: "450px" },
              borderRadius: "20px",
              boxShadow: "0.5em 1em 1em rgb(64 64 70)",
            }}
          />
        </Grid>
        <Grid container xs={12} lg={8} gap={2} sx={{ pl: { lg: "4rem" } }}>
          <Typography
            variant="h3"
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {movieInfo?.title}
          </Typography>
          <Typography variant="h5" sx={{ width: "100%", textAlign: "center" }}>
            {movieInfo?.tagline}
          </Typography>
          <Grid container xs={12}>
            <Grid xs={12} md={6} sx={{ mb: { xs: "10px" } }}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Rating
                  value={movieInfo?.vote_average / 2}
                  precision={0.25}
                  readOnly
                  sx={{
                    "& .MuiRating-decimal": {
                      "& .MuiRating-icon": {
                        "& .MuiSvgIcon-root": {
                          color: darkTheme ? "rgb(250, 175, 0)" : "",
                        },
                      },
                    },
                  }}
                />
                <Typography component="p" sx={{ fontSize: "1.2rem" }}>
                  {movieInfo?.vote_average} / 10
                </Typography>
              </Box>
              <Grid />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography component="p" textAlign="center" fontSize="1.2rem">
                {movieInfo?.runtime} min /<span>{movieInfo?.release_date}</span>
                /<span> English</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} justifyContent="space-around">
            {movieGenre.map((genre) => (
              <Link
                to="/"
                key={genre?.name}
                onClick={() => handleMoviesGenresChange(genre.id)}
                style={{
                  color: darkTheme ? "#fff" : "",
                  margin: "0.5rem 1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      filter: darkTheme ? "invert(1)" : "",
                    }}
                  >
                    {genre.icon}
                  </Box>
                  <Typography>{genre.name}</Typography>
                </Box>
              </Link>
            ))}
          </Grid>
          <Grid xs={12}>
            <Typography variant="h5">Overview</Typography>
            <Typography
              component="p"
              sx={{
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
              }}
            >
              {movieInfo?.overview}
            </Typography>
          </Grid>
          <Typography variant="h5">Top Cast </Typography>
          <Grid container xs={12}>
            {movieInfo?.credits?.cast?.slice(0, 6).map((item) => (
              <Grid xs={4} md={2} key={item?.id} sx={{ pr: "12px" }}>
                <Link
                  to={`/actors/${item?.id}`}
                  style={{ color: darkTheme ? "#fff" : "" }}
                >
                  <Box
                    borderRadius="10px"
                    component="img"
                    sx={{ width: "100%", height: "128px", objectFit: "cover" }}
                    src={`https://image.tmdb.org/t/p/w500//${item?.profile_path}`}
                  />

                  <Typography component="p">{item?.name}</Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: darkTheme
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {item?.character}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid container xs={12}>
            {moviePageBtn.map((item) => (
              <Grid xs={4} key={item.name}>
                <Button
                  component="a"
                  href={item.link}
                  sx={{
                    border: "1px solid",
                    width: { md: "60%", xs: "100%" },
                    color: darkTheme ? "#90CAF9" : "",
                    "&:hover": {
                      color: darkTheme ? "#c1def4" : "",
                    },
                  }}
                  color="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography sx={{ fontSize: "0.8rem", mr: "5px" }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {item.icon}
                  </Box>
                </Button>
              </Grid>
            ))}
            <Grid xs={4}>
              <Button
                onClick={handleVideoOpen}
                sx={{
                  border: "1px solid",
                  width: { md: "60%", xs: "100%" },
                  color: darkTheme ? "#90CAF9" : "",
                  "&:hover": {
                    color: darkTheme ? "#c1def4" : "",
                  },
                }}
                color="primary"
              >
                <Typography sx={{ fontSize: "0.8rem", mr: "5px" }}>
                  TRAILER
                </Typography>
                <TheatersIcon sx={{ fontSize: "20px" }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Box mt="80px">
          {recommendations?.total_results > 0 && (
            <Typography variant="h3" textAlign="center" mb="40px">
              You May Also Like
            </Typography>
          )}
          <Grid container spacing={2} justifyContent="center">
            {recommendations?.results?.slice(0, 12).map((item) => (
              <MovieCard
                item={item}
                key={item?.id}
                color={darkTheme ? "#fff" : ""}
                starColor={darkTheme ? "rgb(250, 175, 0)" : ""}
              />
            ))}
          </Grid>
        </Box>
        <Modal
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleVideoClose}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              p: 4,
              width: { xs: "338px", sm: "560px" },
              height: { xs: "500px", sm: "315px" },
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movieInfo?.videos?.results[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Modal>
      </Grid>
    );
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return <>{content}</>;
};

export default MovieDetail;
