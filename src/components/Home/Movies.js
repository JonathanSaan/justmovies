import APIKey from "../../mocks/api";
import { useState, useEffect } from "react";

export const Movies = () => {
  
  const [ listMovies, setListMovies ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${APIKey}&language=en-US`)
    .then(response => response.json())
    .then(data => console.log(data.results))
  }, [])
  
  return (
    <>
      {listMovies.map((movie) => (
        <div className="Movies" key={movie.id}>
          <img src={`${Image_path}${movie.poster_path}`} alt={movie.title} />
          <h1 className="MovieTitle">{movie.title}</h1>
        </div>
      ))}
    </>
  );
      
};