import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Header } from "../Header";
import "./style.scss"



export const Categories = ({ category }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="Categories">
        <div className="ContainerCategory">
          <div className="title">
            <h1>Genre</h1>
          </div>
          {category.map((genre) => (
            <Link to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}>
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