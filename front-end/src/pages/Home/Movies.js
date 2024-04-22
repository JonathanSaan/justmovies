import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { SkeletonHomeMovies } from "../../components/Skeleton";
import APIKey from "../../mocks/api";

export const Movies = () => {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
      setListMovies(respost.data.results.slice(0, 12));
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  return (
    <>
      {listMovies.length > 0 ? (
         <>
           {listMovies.map((movie) => (
             <Link to={`/movies/${movie.id}`} className="home_container_newmovie_card" key={movie.id} aria-label={movie.title}>
               <div>
                 <img
                   className="home_container_newmovie_card-image"
                   height="333"
                   width="112"
                   src={movie.poster_path ? Image_path + movie.poster_path : "/imageError.webp"}
                   alt={movie.title ? movie.title : "a movie"}
                 />
                 <h2 className="home_container_newmovie_card-title">
                   {movie.title}
                 </h2>
               </div>
             </Link>
           ))}
         </>
       ) : (
         <SkeletonHomeMovies />
       )}
    </>
  );
};
