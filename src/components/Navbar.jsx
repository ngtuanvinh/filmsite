import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Toolbar, IconButton, Button } from "@mui/material";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";

import { toggle, selectDarkTheme } from "../redux/features/DarkThemeSlice";

import SearchBar from "./SearchBar";

const Navbar = ({ setMobileOpen }) => {
  const darkTheme = useSelector(selectDarkTheme);
  const dispatch = useDispatch();

  const darkThemeStyle = (darkTheme) => (darkTheme ? "#383838" : "#1976D2");

  return (
    <Paper
      position="fixed"
      elevation={4}
      component="header"
      sx={{
        borderRadius: "0",
        backgroundColor: darkThemeStyle(darkTheme),
        display: { xs: "flex" },
        flexDirection: { xs: "column" },
        position: "fixed",
        zIndex: "10",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Toolbar
        className="toolbar"
        position="relative"
        sx={{
          ml: { sm: "240px" },
          gap: { sm: "30px" },
          minHeight: { sm: "80px" },
        }}
      >
        <IconButton
          className="navbar-btn"
          sx={{
            display: { sm: "none", color: "#fff" },
          }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <IconButton
          className="navbar-btn"
          onClick={() => dispatch(toggle())}
          sx={{ color: "#fff", ml: "8px" }}
        >
          {darkTheme ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
        </IconButton>
        <div>
          <Button variant="text" size="medium" sx={{ color: "#fff" }}>
            LOGIN
            <AccountCircleRoundedIcon sx={{ ml: "7px" }} />
          </Button>
        </div>
        <SearchBar darkTheme={darkTheme} darkThemeStyle={darkThemeStyle} />
      </Toolbar>
    </Paper>
    // </ThemeProvider>
  );
};

export default Navbar;
