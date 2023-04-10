import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useMovie } from "./MoviesTypesContext";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#90caf9",
    },
  },
});

const SearchBar = ({ darkTheme, darkThemeStyle }) => {
  const navigate = useNavigate();
  const { setPage } = useMovie();
  const [searchTerm, setSearchTerm] = useState("");
  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
    setSearchTerm("");
    setPage(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: "0 auto", mb: "10px" }}>
        <FormControl
          variant="standard"
          component="form"
          onSubmit={onHandleSubmit}
          sx={{
            boxShadow: "none",
            borderRadius: 0,
            backgroundColor: darkThemeStyle(darkTheme),
          }}
        >
          <Input
            color={darkTheme ? "secondary" : "warning"}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            sx={{
              caretColor: "#fff",
              color: "#fff",
              "&.MuiInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "2px solid #fff",
              },
              "&.MuiInput-root:before": {
                borderBottom: darkTheme
                  ? "1px solid #d1cfcf"
                  : "1px solid #95C0EA",
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  sx={{ color: darkTheme ? "#fff" : "#95C0EA", p: "0" }}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;
