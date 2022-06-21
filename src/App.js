import { useState, useEffect } from "react";

import axios from "axios";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
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
  
  const LoadGenres = async () => {
    const listGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`);
    
    {category.map(genre => {console.log(genre) })}
    console.log(category)
    setCategories(listGenres.data.genres);
  };
  
  useEffect(() => { 
    LoadGenres() 
  }, [] );
  
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/new-movies" element={<NewMovies />} />
          <Route exact path="/top-rated" element={<TopRated />} />
          <Route path="/search/" element={<Home />} />
          <Route path="/search/:searched" element={<Search />} />
          <Route path="/:details" element={<Details setIdGenreSelected={setIdGenreSelected} />} />
          
          <Route path="/genre" element={<Categories category={category} />} />
          <Route path="/genre/:id/:genre" element={<MoviesGenre />} />
        </Routes>
      </Router>
    </SkeletonTheme>
  );
};
/*

          {category.map(genre => {
            return <Route key={genre.id} path={`/genre/:genre`} element={<MoviesGenre idGenreSelected={genre.id} /> } />
          })}
          
  {category.map(genre => (
              <Route key={genre.id} path={`/genre/${genre.name.replaceAll(" ", "-").toLowerCase()}`} element={<MoviesGenre category={genre.id} idGenreSelected={genre.id} /> } />
              
            ))
          }
          
          {category.map(genre => {
             return <Route path={`/genre/${genre.name}`} element={<MoviesGenre category={genre.id} idGenreSelected={genre.id} /> } />
           })}
           
           */
          //<Route path={category.map(genre => `/genre/${genre.name.replaceAll(" ", "-").toLowerCase()}`)} element={<MoviesGenre category={category} idGenreSelected={idGenreSelected} />} />
          //<Route path="/genre/:genre" element={<MoviesGenre category={category} idGenreSelected={idGenreSelected} />} />
export default App;