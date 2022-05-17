import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

export const MoviesGenre = () => {
  
  const { genre } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`)
          console.log(respost)
      } catch (error) {
        console.log(error);
      };
    };
  });
  
  return (
      <>
        <Header />
        <div className="MoviesGenre">
          <div className="ContainerGenre">
            <div className="title">
              <h1> 
                {genre.replaceAll("-", " ")}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
};