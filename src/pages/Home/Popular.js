import { useState, useEffect } from "react";

import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import APIKey from "../../mocks/api";
import { SkeletonHomePopular } from "../../components/Skeleton";
import { popularcarouselsetting } from "../../mocks/carouselsettings";

export const Popular = ({ navigate }) => {
  const [listPopular, setListPopular] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
      setListPopular(respost.data.results);
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      {listPopular.length > 0 ? (
        <Slider {...popularcarouselsetting} className="home_container_popular">
          {listPopular.map((popular) => (
            <div
              onClick={() => {navigate(`/${popular.id}`)}}
              className="home_container_popular_card"
              key={popular.id}
            >
              <img
                loading="lazy"
                className="home_container_popular_card-image"
                src={popular.poster_path ? Image_path + popular.poster_path : imageError}
                alt={popular.title}
              />
              <h2 className="home_container_popular_card-title">
                {popular.title}
              </h2>
            </div>
          ))}
        </Slider>
      ) : <SkeletonHomePopular popularcarouselsetting={popularcarouselsetting} />}
    </>
  );
};