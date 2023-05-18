import { useState, useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewMovies from "./pages/NewMovies";
import TopRated from "./pages/TopRated";
import Categories from "./pages/Categories";
import MoviesGenre from "./pages/MoviesGenre";
import Search from "./pages/Search";
import Details from "./pages/Details";

import APIKey from "./mocks/api";

function App() {
  const [category, setCategories] = useState([]);

  const LoadGenres = async () => {
    const listGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`);
    setCategories(listGenres.data.genres);
  };

  useEffect(() => {
    LoadGenres();
  }, []);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/new-movies" element={<NewMovies />} />
          <Route path="/new-movies?page=:page" element={<NewMovies />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/top-rated?page=:page" element={<TopRated />} />
          <Route path="/search/" element={<Home />} />
          <Route path="/search/:searched" element={<Search />} />
          <Route path="/:details" element={<Details />} />

          <Route path="/genre" element={<Categories category={category} />} />
          <Route path="/genre/:id/:genre" element={<MoviesGenre />} />
          <Route path="/genre/:id/:genre?page=:page" element={<MoviesGenre />} />
        </Routes>
      </Router>
      <Analytics debug={false} />
    </SkeletonTheme>
  );
}

export default App;