import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";


export const TopRated = () => {
  
  const [ listRated, setListRated ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const Image_Error = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ffc%2FNo_picture_available.png&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ANo_picture_available.png&tbnid=-TB8xxyh9ElsHM&vet=1&docid=uoMMwGZMmYtIhM&w=949&h=1419&source=sh%2Fx%2Fim";
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
      setListRated(respost.data.results.slice(1, 13));
    } catch (error) {
      console.log(error);
    };
  };
  
  return (
    <>
      {listRated.map((rated) => (
        <Link to={`/${rated.id}`} >
          <div className="Rateds" key={rated.id}>
            <img className="RatedImage" src={`${Image_path}` ? `${Image_path}${rated.poster_path}` : {Image_Error}} alt={rated.name}/>
            <h2 className="RatedTitle">{rated.title}</h2>
          </div>
        </Link>
      ))}
    </>
  );

};