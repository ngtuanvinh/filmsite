import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Grid, Typography, Button, Pagination } from "@mui/material";

import { selectDarkTheme } from "../redux/features/DarkThemeSlice";
import { useGetActorQuery } from "../redux/services/movieApi";

import MovieCard from "./MovieCard";
import Loader from "./Spinner";

const PersonDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const darkTheme = useSelector(selectDarkTheme);

  const paginate = (e, value) => {
    setCurrentPage(value);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: personInfo,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetActorQuery(id);
  const movies = personInfo?.movie_credits?.cast;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  let content;

  if (isFetching) {
    content = <Loader darkTheme={darkTheme} />;
  } else if (isSuccess) {
    content = (
      <Grid
        container
        sx={{ justifyContent: "center", color: darkTheme ? "#fff" : "" }}
      >
        <Grid
          xs={12}
          md={4}
          sx={{ mb: { lg: "5rem" }, justifyContent: "center" }}
        >
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${personInfo?.profile_path}`}
            sx={{
              width: { xs: "100%", lg: "90%" },
              borderRadius: 5,
              boxShadow: "0.5em 0.5em 1em",
            }}
          />
        </Grid>
        <Grid xs={12} md={8} pl={{ md: "2rem" }} sx={{ mb: "5rem" }}>
          <Typography variant="h2" sx={{ width: "100%", mb: "1rem" }}>
            {personInfo?.name}
          </Typography>
          <Typography variant="h5" sx={{ width: "100%", mb: "0.4rem" }}>
            Born: {personInfo?.birthday}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontWeight: 400,
              fontSize: "0.875rem",
              textAlign: "justify",
              mb: "2.5rem",
            }}
          >
            {personInfo?.biography
              ? personInfo?.biography
              : "No biography available ..."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              component="a"
              href={`https://www.imdb.com/name/${personInfo?.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "rgb(25, 118, 210)",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgb(21, 101, 192)",
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
                },
              }}
            >
              IDMB
            </Button>
            <Button
              onClick={() => navigate(-1)}
              sx={{
                bgcolor: "rgb(25, 118, 210)",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgb(21, 101, 192)",
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
                },
              }}
            >
              BACK
            </Button>
          </Box>
        </Grid>
        <Typography
          variant="h3"
          sx={{ mb: "2rem", width: "100%", textAlign: "center" }}
        >
          Movies
        </Typography>
        <Grid container sx={{ justifyContent: "center", mb: "1rem" }}>
          {currentMovies?.map((item) => (
            <MovieCard
              item={item}
              key={item.id}
              color={darkTheme ? "#fff" : ""}
              starColor={darkTheme ? "rgb(250, 175, 0)" : ""}
            />
          ))}
        </Grid>
        {movies?.length > 12 && (
          <Pagination
            defaultPage={1}
            color="primary"
            count={Math.ceil(movies?.length / moviesPerPage)}
            page={currentPage}
            onChange={paginate}
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
                "& .MuiPaginationItem-root.Mui-selected": {
                  bgcolor: darkTheme ? "#f23835" : "",
                  "&:hover": {
                    bgcolor: darkTheme ? "#e02421" : "",
                  },
                },
                "& .MuiButtonBase-root": {
                  color: darkTheme ? "#fff" : "",
                },
              },
            }}
          />
        )}
      </Grid>
    );
  } else if (isError) {
    content = <div>{error.tostring()}</div>;
  }

  return <>{content}</>;
};

export default PersonDetail;
