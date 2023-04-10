import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useMovie } from "./MoviesTypesContext";

import { selectDarkTheme } from "../redux/features/DarkThemeSlice";
import { useGetMoviesQuery } from "../redux/services/movieApi";

import MovieCard from "./MovieCard";
import Loader from "./Spinner";

const Main = () => {
  const { categoryOrGenreId, page, setPage } = useMovie();
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const darkTheme = useSelector(selectDarkTheme);
  const { data, isFetching, isSuccess, isError, error } = useGetMoviesQuery({
    categoryOrGenreId,
    page,
  });
  const moviesList = data?.results.slice(0);
  const selectFirstMovie = moviesList?.splice(0, 1);

  let content;

  if (isFetching) {
    content = <Loader darkTheme={darkTheme} />;
  } else if (isSuccess) {
    content = (
      <>
        <Grid container sx={{ m: 0 }} rowSpacing={5}>
          {selectFirstMovie?.map((movie) => (
            <Grid xs={12} key={movie.id} sx={{ p: 0 }}>
              <Link to={`/movie/${movie.id}`}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "490px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="490px"
                    atl={movie.title}
                    media="picture"
                    sx={{
                      borderRadius: "7px",
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                      position: "absolute",
                      backgroundColor: " rgba(0, 0, 0, 0.575)",
                      backgroundBlendMode: "darken",
                    }}
                  />
                  <Box sx={{ position: "relative" }}>
                    <CardContent
                      sx={{
                        color: "#fff",
                        width: { md: "40%" },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontSize: { xs: "1.5rem" } }}
                        component="h4"
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        paragraph={true}
                        sx={{ display: { xs: "none", sm: "block" } }}
                      >
                        {movie.overview}
                      </Typography>
                    </CardContent>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
          <Grid container spacing={1}>
            {moviesList?.slice(0, 16).map((item) => (
              <MovieCard
                item={item}
                key={item.id}
                color={darkTheme ? "#fff" : ""}
                starColor={darkTheme ? "rgb(250, 175, 0)" : ""}
              />
            ))}
          </Grid>
        </Grid>
        <Pagination
          count={100}
          color="primary"
          boundaryCount={2}
          siblingCount={1}
          page={page}
          onChange={handlePageChange}
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
      </>
    );
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return <>{content}</>;
};

export default Main;
