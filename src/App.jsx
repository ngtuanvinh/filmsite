import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { selectDarkTheme } from "./redux/features/DarkThemeSlice";

import {
  Main,
  MovieDetail,
  SearchPage,
  PersonDetail,
  Navbar,
  ResponsiveSidebar,
  MoviesTypesProvider,
} from "./components";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const darkTheme = useSelector(selectDarkTheme);

  return (
    <MoviesTypesProvider>
      <BrowserRouter>
        <Box className="container">
          <Navbar setMobileOpen={setMobileOpen} />
          <ResponsiveSidebar
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
          <Box className="main" sx={{ bgcolor: darkTheme ? "#121212" : "" }}>
            <div className="main-div"></div>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search/:movieName" element={<SearchPage />} />
              <Route path="/actors/:id" element={<PersonDetail />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </MoviesTypesProvider>
  );
}

export default App;
