import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";



export const Popular = ({ navigate }) => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);

  const [ listPopular, setListPopular ] = useState([]);

  useEffect(() => { 
    window.scrollTo(0, 0);
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
      setListPopular(respost.data.results);
    };
    load();
  }, [] );
  
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";



 return (
   <>
    {!listPopular.length == 0 ? (
      <motion.div
        className="carousel"
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {listPopular.map((popular) => (
              <div onClick={() => {navigate(`/${popular.id}`) }} className="Populars" key={popular.id}>
                <img className="PopularImage" src={popular.poster_path ? Image_path + popular.poster_path : imageError} alt={popular.title} /> 
                <h2 className="PopularTitle">{popular.title}</h2>
              </div>
            ))}
        </motion.div>
      </motion.div>
      ) : (
        <motion.div>
          {Array(20).fill(1).map((card, index) => (
            <>
              <Skeleton className="ImageLoading" variant="rectangular" />
              <Skeleton className="Text" variant="text" count={1}/>
            </>
          ))}
        </motion.div>
      )}
   </>
  );
};