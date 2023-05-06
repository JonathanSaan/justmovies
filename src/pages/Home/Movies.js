import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { SkeletonHomeMovies } from "../../components/Skeleton";
import APIKey from "../../mocks/api";

export const Movies = () => {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
      setListMovies(respost.data.results.slice(0, 12));
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      {listMovies.length > 0 ? (
        <>
          {listMovies.map((movie) => (
            <Link
              to={`/${movie.id}`}
              className="home_container_newmovie_card"
              key={movie.id}
            >
              
                <img
                  loading="lazy"
                  className="home_container_newmovie_card-image"
                  src={movie.poster_path ? Image_path + movie.poster_path : imageError}
                  alt={movie.title}
                />
                <h2 className="home_container_newmovie_card-title">
                  {movie.title}
                </h2>
              
            </Link>
          ))}
        </>
      ) : <SkeletonHomeMovies />}
    </>
  );
};
