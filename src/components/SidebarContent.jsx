import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../redux/services/movieApi";
import { useMovie, useMovieGenreUpdate } from "./MoviesTypesContext";

import {
  List,
  Divider,
  ListItemButton,
  ListItemText,
  Paper,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import Logo from "../assets/filmpire.png";
import { categories, genres } from "../utils/constant";

import { selectDarkTheme } from "../redux/features/DarkThemeSlice";

const SidebarContent = ({ handleSidebarToggle }) => {
  const darkTheme = useSelector(selectDarkTheme);
  const { categoryOrGenreId } = useMovie();
  const handleMoviesGenresChange = useMovieGenreUpdate();

  useGetMoviesQuery({
    categoryOrGenreId,
    page: 1,
  });

  return (
    <Paper
      direction="column"
      sx={{
        height: "100vh",
        borderRadius: "0",
        width: "240px",
        overflowY: "scroll",
        bgcolor: darkTheme ? "#121212" : "",
      }}
      onClick={handleSidebarToggle}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          padding: "10% 0",
          justifyContent: "center",
        }}
        onClick={() => handleMoviesGenresChange(categoryOrGenreId)}
      >
        <img
          src={Logo}
          alt="Logo"
          className={`logo ${darkTheme ? "logo__darkmode" : ""}`}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader
          sx={{
            bgcolor: darkTheme ? "#121212" : "",
            color: darkTheme ? "#d1cfcf" : "",
          }}
        >
          Categories
        </ListSubheader>
        {categories.map((item) => (
          <Link to="/" key={item.name}>
            <ListItemButton
              sx={{ color: darkTheme ? "#fff" : "" }}
              onClick={() => handleMoviesGenresChange(item.type)}
            >
              <ListItemIcon className={darkTheme ? "icon__darkmode" : ""}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name}></ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader
          sx={{
            bgcolor: darkTheme ? "#121212" : "",
            color: darkTheme ? "#d1cfcf" : "",
          }}
        >
          Genres
        </ListSubheader>
        {genres.map((item) => (
          <Link to="/" key={item.name}>
            <ListItemButton
              sx={{ color: darkTheme ? "#fff" : "" }}
              onClick={() => handleMoviesGenresChange(item.id)}
            >
              <ListItemIcon className={darkTheme ? "icon__darkmode" : ""}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name}></ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

export default SidebarContent;
