import { useState, useEffect } from "react";

import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";

export const TopRated = ({ navigate }) => {
  const [listRated, setListRated] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      const respost = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`
      );
      setListRated(respost.data.results.slice(0, 12));
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      {listRated.length > 0 ? (
        <>
          {listRated.map((rated) => (
            <div
              onClick={() => {navigate(`/${rated.id}`)}}
              className="home_container_ratedmovie_card"
              key={rated.id}
            >
              <img
                loading="lazy"
                className="home_container_ratedmovie_card-image"
                src={rated.poster_path ? Image_path + rated.poster_path : imageError}
                alt={rated.name}
              />
              <h2 className="home_container_ratedmovie_card-title">
                {rated.title}
              </h2>
            </div>
          ))}
        </>
      ) : (
        <>
          {Array(12).fill(1).map((card, index) => (
              <div key={index} className="home_container_ratedmovie_card">
                <Skeleton
                  className="home_container_ratedmovie_card-image"
                  variant="rectangular"
                />
                <Skeleton
                  className="home_container_ratedmovie_card-title"
                  variant="text"
                  count={1}
                />
              </div>
            ))}
        </>
      )}
    </>
  );
};