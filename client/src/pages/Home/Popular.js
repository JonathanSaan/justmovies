import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import APIKey from "../../mocks/api";

export const Popular = () => {
  const [listPopular, setListPopular] = useState([]);

  useEffect(() => {
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
      setListPopular(respost.data.results.slice(0, 13));
    };
    load();
  }, []);

  const Image_path = "https://image.tmdb.org/t/p/w1280";
  
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      allowTouchMove
      centeredSlides
      navigation
      loop
      className="home_container_popular"
    >
      {listPopular.map((popular) => (
        <SwiperSlide key={popular.id}>
          <div className="home_container_popular_card">
            <img
              className="home_container_popular_card-image"
              src={popular.backdrop_path ? Image_path + popular.backdrop_path : "/imageError.webp"}
              alt={popular.title ? `Poster of the movie ${popular.title}` : "Image unavailable"}
            />
          </div>
            
          <div className="home_container_popular_caption">
            <h2 className="home_container_popular_caption-title">{popular.title}</h2>
              
            <p className="home_container_popular_caption-description">
              {popular.overview.length > 150 ? `${popular.overview.substring(0, 150)}...` : popular.overview}
            </p>
            <Link to={`/movies/${popular.id}`} className="home_container_popular_caption-button" draggable="false" title={`See more about ${popular.title}`}>
              see more
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
