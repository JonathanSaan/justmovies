import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import "./style.scss"

import APIKey from "../../mocks/api";


export const Categories = () => {
  
  const [ categorie, setCategorie ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`);
        setCategorie(respost.data.genres);
        
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  return (
      <>
        <Header />
        <div className="Categories">
          <div className="ContainerCategorie">
            <div className="title">
              <h1>Categories</h1>
            </div>
            {categorie.map((genre) => (
              <Link to={`/Categories/${genre.name.replaceAll(" ", "-")}`}>
                <button> 
                  {genre.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
};