import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

export const Search = () => {
  
  const { searched } = useParams();
  const UrlApi = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searched}&page=1&include_adult=false`
  
  const [ searchesFound, setSearchesFound ] = useState([]);
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(UrlApi);
      setSearchesFound(respost.data.results);
      //console.log(respost.data.results);
      console.log(respost)
      
    } catch (error) {
      console.log(error);
    };
  };
  
  return (
      <>
        <Header />
        <div className="Search">
          <div className="ResultdFound">
            <h1>Results found: {searched.replaceAll("+", " ")}</h1>
          </div>
          <div className="SearchesFound">
            
          </div>
        </div>
      </>
    );
    
};
          /*<div>
            {searchesFound.map((filme) => (
              <div key={filme.}> 
                <p>{filme} </p>
              </div> 
            ))}
            
          </div>*/