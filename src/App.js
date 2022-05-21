import axios from "axios";
import { SkeletonTheme } from "react-loading-skeleton";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { NewMovies } from "./components/NewMovies";
import { TopRated } from "./components/TopRated";
import { Categories } from "./components/Categories";
import { MoviesGenre } from "./components/MoviesGenre";
import { Search } from "./components/Search";
import { Details } from "./components/Details";

import APIKey from "./mocks/api";



function App() {
  const [ category, setCategories ] = useState([]);
  const [ idGenreSelected, setIdGenreSelected ] = useState([]);
 
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const listGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`);
        setCategories(listGenres.data.genres);
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/NewMovies" element={<NewMovies />} />
          <Route exact path="/TopRated" element={<TopRated />} />
          <Route path="/search/" element={<Home />} />
          <Route path="/search/:searched" element={<Search />} />
          <Route path="/:details" element={<Details />} />
          <Route path="/categories" element={<Categories category={category} setIdGenreSelected={setIdGenreSelected} />} />
          <Route path="/categories/:genre" element={<MoviesGenre category={category} idGenreSelected={idGenreSelected} />} />
        </Routes>
      </Router>
    </SkeletonTheme>
  );
};

export default App;