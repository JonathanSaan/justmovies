import { useParams } from "react-router-dom";

import { Header } from "../Header";
//import ListMovies from "../../mocks/ListMovies";

import "./style.scss";

export const Search = () => {
  
  let { searched } = useParams();
  
  //const lowerSearch = searched.toLowerCase();
  
  //const MovieFilted = ListMovies.filter((movie) => movie.title.toLowerCase())
  
  
  return (
      <>
        <Header />
        <div className="Search">
          <div>
            <h1>Results found: {searched.replaceAll("+", " ")}</h1>
          </div>
          
        </div>
      </>
    );
    
};
          /*<div>
            {MovieFilted.map((filme) => (
              <div> 
                <p>{filme} </p>
              </div> 
            ))}
          </div>*/