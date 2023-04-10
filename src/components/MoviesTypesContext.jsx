import React, { useState, useContext } from "react";

const MoviesTypeContext = React.createContext(null);
const MoviesUpdateGenresContext = React.createContext(null);

export const useMovie = () => useContext(MoviesTypeContext);
export const useMovieGenreUpdate = () => useContext(MoviesUpdateGenresContext);

const MoviesTypesProvider = ({ children }) => {
  const [categoryOrGenreId, setCategoryOrGenreId] = useState("popular");
  const [page, setPage] = useState(1);

  const handleMoviesGenresChange = (types = "popular", page) => {
    setCategoryOrGenreId(types);
    setPage(1);
  };
  return (
    <MoviesTypeContext.Provider value={{ categoryOrGenreId, page, setPage }}>
      <MoviesUpdateGenresContext.Provider value={handleMoviesGenresChange}>
        {children}
      </MoviesUpdateGenresContext.Provider>
    </MoviesTypeContext.Provider>
  );
};

export default MoviesTypesProvider;
