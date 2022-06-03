import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Whirligig from "react-whirligig";

import APIKey from "../../mocks/api";



export const Popular = ({ navigate }) => {
  
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
    {!listPopular.length === 0 ? (
      <Whirligig visibleSlides={6} gutter="1em">
        {listPopular.map((popular) => (
            <div onClick={() => {navigate(`/${popular.id}`) }} className="Populars" key={popular.id}>
              <img className="PopularImage" src={popular.poster_path ? Image_path + popular.poster_path : imageError} alt={popular.title} /> 
              <h2 className="PopularTitle">{popular.title}</h2>
            </div>
          ))}
      </Whirligig>
      ) : (
        <Whirligig visibleSlides={6} gutter="1em">
          {Array(20).fill(1).map((card, index) => (
            <>
              <Skeleton className="ImageLoading" variant="rectangular" />
              <Skeleton className="Text" variant="text" count={1}/>
            </>
          ))}
        </Whirligig>
      )}
   </>
  );
};