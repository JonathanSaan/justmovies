import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import APIKey from "../../mocks/api";

import { Header } from "../Header";
import "./style.scss";

export const Details = () => {
  
  const [ detailsMovie, setDetailsMovie ] = useState([])
  const [ genres, setGenres ] = useState([])
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`);
      setDetailsMovie(respost.data);
      setGenres(respost.data.genres);
      console.log(respost);
    } catch (error) {
      console.log(error);
    };
  };
  
  
  
  let { details } = useParams();
  
  const Image_path = "https://image.tmdb.org/t/p/w780";
  const Image_Error = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ffc%2FNo_picture_available.png&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ANo_picture_available.png&tbnid=-TB8xxyh9ElsHM&vet=1&docid=uoMMwGZMmYtIhM&w=949&h=1419&source=sh%2Fx%2Fim";
  
  return (
            //<img src={`${Image_path}` ? `${Image_path}${detailsMovie.backdrop_path}` : `${Image_Error}`} alt={detailsMovie.title} />
      <>
        <Header />
        <div className="Details">
          <div className="BackDrop" style={{backgroundImage: `url(${Image_path}${detailsMovie.backdrop_path})`}}>
          </div>
          <div className="MovieDetails">
            <img className="PrincipalImage" src={`${Image_path}` ? `${Image_path}${detailsMovie.poster_path}` : `${Image_Error}`} alt={detailsMovie.title} />
            <span>
              <h1 className="TitleMovie">
                {detailsMovie.original_title &&  detailsMovie.name }  {detailsMovie.title}
              </h1>
              <p className="ReleaseDate"> 
                {detailsMovie.release_date}
              </p>
              <hr />
              <div className="Votes">
                <IoIosStar size={15} color="yellow"/>
                {detailsMovie.vote_average}
              </div>
              <hr />
              <div className="Genres">
                {genres.map((genre) => 
                  <button className="genre">
                    {genre.name}
                  </button>
                )}
              </div>
            </span>
            
          </div>
          <div className="Description">
            <hr />
            <h2 className="Overview">
              {detailsMovie.overview}
            </h2>
          </div>
          <div className="Trailer">
          </div>
        </div>
      </>
    );
    
};
