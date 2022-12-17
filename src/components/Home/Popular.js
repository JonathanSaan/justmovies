import { useState, useEffect } from "react";

import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
/*
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//import "./styles.css"

import { motion } from "framer-motion"; */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";
import settings from "../../mocks/carouselsettings";


export const Popular = ({ navigate }) => {
  const [listPopular, setListPopular] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    //setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);

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
      {!listPopular.length == 0 ? (
        <Slider {...settings} className="owl-theme">
          {listPopular.map((popular) => (
            <div onClick={() => { navigate(`/${popular.id}`) }} className="item" key={popular.id}>
              <img className="PopularImage" src={popular.poster_path ? Image_path + popular.poster_path : imageError} alt={popular.title} />
              <h2 className="PopularTitle">{popular.title}</h2>
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings} className="owl-theme">
          {Array(20).fill(1).map((card, index) => (
            <div className="item">
              <Skeleton className="ImageLoading" variant="rectangular" />
              <Skeleton className="Text" variant="text" count={1} />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};