import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import "./style.scss"

import APIKey from "../../mocks/api";


export const Categories = () => {
  
  const [ category, setCategories ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`);
        setCategories(respost.data.genres);
        
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
          <div className="ContainerCategory">
            <div className="title">
              <h1>Category</h1>
            </div>
            {category.map((genre) => (
              <Link to={`/categories/${genre.name.replaceAll(" ", "-")}`}>
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