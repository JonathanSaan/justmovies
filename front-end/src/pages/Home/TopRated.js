import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { SkeletonHomeTopRated } from "../../components/Skeleton";
import APIKey from "../../mocks/api";

export const TopRated = () => {
  const [listRated, setListRated] = useState([]);

  useEffect(() => {
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
      setListRated(respost.data.results.slice(0, 12));
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      {listRated.length > 0 ? (
        <>
          {listRated.map((rated) => (
            <div className="home_container_ratedmovie_card" key={rated.id}>
              <Link to={`/movies/${rated.id}`} aria-label={rated.name}>
                <img
                  loading="lazy"
                  className="home_container_ratedmovie_card-image"
                  height="333"
                  width="112"
                  src={rated.poster_path ? Image_path + rated.poster_path : imageError}
                  alt={rated.name ? rated.name : "a top rated movie"}
                />
              </Link>
              <Link to={`/movies/${rated.id}`}>
                <h2 className="home_container_ratedmovie_card-title">
                  {rated.title}
                </h2>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <SkeletonHomeTopRated />
      )}
    </>
  );
};
