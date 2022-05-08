import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";


export const Movies = () => {
  
  const [ listMovies, setListMovies ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  useEffect(() => { 
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
        setListMovies(respost.data.results.slice(1, 13));
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  
  return (
    <>
      {listMovies.map((movie) => (
        <Link to={`/${movie.id}`}>
            <div className="Movies" key={movie.id}>
              <img className="MovieImage" src={`${Image_path}${movie.poster_path}`} alt={movie.title} />
              <h2 className="MovieTitle">{movie.title}</h2>
            </div>
          </Link>
      ))}
    </>
  );
      
};