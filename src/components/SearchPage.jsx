import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Pagination, Grid } from "@mui/material";

import { useGetMoviesBySearchQuery } from "../redux/services/MovieApi";
import { selectDarkTheme } from "../redux/features/DarkThemeSlice";

import { useMovie } from "./MoviesTypesContext";
import MovieCard from "./MovieCard";
import Loader from "./Spinner";

const SearchPage = () => {
  const darkTheme = useSelector(selectDarkTheme);
  const { page, setPage } = useMovie();
  const { movieName } = useParams();
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const {
    data: movies,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMoviesBySearchQuery({ movieName, page });

  let content;

  if (isFetching) {
    content = <Loader darkTheme={darkTheme} />;
  } else if (isSuccess) {
    content = (
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid container sx={{ justifyContent: "center", mb: "1rem" }}>
          {movies?.results?.map((item) => (
            <MovieCard
              item={item}
              key={item.id}
              color={darkTheme ? "#fff" : ""}
              starColor={darkTheme ? "rgb(250, 175, 0)" : ""}
            />
          ))}
        </Grid>
        {movies?.total_pages > 1 && (
          <Pagination
            count={movies?.total_pages}
            color="primary"
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
        )}
      </Grid>
    );
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return <>{content}</>;
};

export default SearchPage;
