import axios from "axios";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";



export const Movies = ({ navigate }) => {
  
  const [ listMovies, setListMovies ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
        setListMovies(respost.data.results.slice(0, 12));
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  
  return (
    <>
      {listMovies.map((movie) => (
        <div onClick={() => {navigate(`/${movie.id}`) }} className="Movies" key={movie.id}>
          <img className="MovieImage" src={movie.poster_path ? Image_path + movie.poster_path : imageError} alt={movie.title} />
          <h2 className="MovieTitle">{movie.title}</h2>
        </div>
      ))}
    </>
  );
};