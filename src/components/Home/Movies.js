import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";


export const Movies = () => {
  
  const [ listMovies, setListMovies ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const Image_Error = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ffc%2FNo_picture_available.png&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ANo_picture_available.png&tbnid=-TB8xxyh9ElsHM&vet=1&docid=uoMMwGZMmYtIhM&w=949&h=1419&source=sh%2Fx%2Fim";
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
      setListMovies(respost.data.results.slice(1, 13));
    } catch (error) {
      console.log(error);
    };
  };
  
  
  return (
    <>
      {listMovies.map((movie) => (
        <Link to={`/${movie.id}`}>
            <div className="Movies" key={movie.id}>
              <img className="MovieImage" src={`${Image_path}` ? `${Image_path}${movie.poster_path}` : {Image_Error}} alt={movie.title} />
              <h2 className="MovieTitle">{movie.title}</h2>
            </div>
          </Link>
      ))}
    </>
  );
      
};