import { useState, useEffect } from "react";
import axios from "axios";
import Whirligig from "react-whirligig";
import { Link } from "react-router-dom";

import APIKey from "../../mocks/api";



export const Popular = () => {
  
  const [ listPopular, setListPopular ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
        setListPopular(respost.data.results);
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
    <Whirligig visibleSlides={6} gutter="1em">
      {listPopular.map((popular) => (
        <Link to={`/${popular.id}`} >
          <div className="Populars" key={popular.id}>
            <img className="PopularImage" src={popular.poster_path ? Image_path + popular.poster_path : imageError} alt={popular.title} /> 
            <h2 className="PopularTitle">{popular.title}</h2>
          </div>
        </Link>
      ))}
    </Whirligig>
   </>
  );
  
};