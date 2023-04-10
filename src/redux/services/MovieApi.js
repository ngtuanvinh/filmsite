import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: function ({ categoryOrGenreId, page }) {
        return isNaN(categoryOrGenreId)
          ? `/movie/${categoryOrGenreId}?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&page=${page}`
          : `/discover/movie?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&page=${page}&with_genres=${categoryOrGenreId}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&append_to_response=videos,credits`,
    }),
    getMovieRecommendations: builder.query({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&page=1`,
    }),
    getActor: builder.query({
      query: (id) =>
        `/person/${id}?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&append_to_response=movie_credits`,
    }),
    getMoviesBySearch: builder.query({
      query: ({ movieName, page }) =>
        `/search/movie?api_key=729fdfdcfcdcbcf91ef68dc03b788059&language=en-US&query=${movieName}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetMovieRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesBySearchQuery,
} = apiSlice;
