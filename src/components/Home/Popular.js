import APIKey from "../../mocks/api";

import { useState, useEffect } from "react";
import axios from "axios";
import Whirligig from "react-whirligig";
import { Link } from "react-router-dom";



export const Popular = () => {
  
  const [ listPopular, setListPopular ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const Image_Error = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ffc%2FNo_picture_available.png&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ANo_picture_available.png&tbnid=-TB8xxyh9ElsHM&vet=1&docid=uoMMwGZMmYtIhM&w=949&h=1419&source=sh%2Fx%2Fim";
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
      setListPopular(respost.data.results);
    } catch (error) {
      console.log(error);
    };
  };
  

 return (
   <>
    <Whirligig visibleSlides={6} gutter="1em">
      {listPopular.map((popular) => (
        <Link to={`/${popular.id}`} >
          <div className="Populars" key={popular.id}>
            <img className="PopularImage" src={`${Image_path}` ? `${Image_path}${popular.poster_path}` : {Image_Error}} alt={popular.title} />
            <h2 className="PopularTitle">{popular.title}</h2>
          </div>
        </Link>
      ))}
    </Whirligig>
   </>
  );
  
};