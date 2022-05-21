import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import "./style.scss"

import APIKey from "../../mocks/api";


export const Categories = ({ category, setIdGenreSelected }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="Categories">
        <div className="ContainerCategory">
          <div className="title">
            <h1>Category</h1>
          </div>
          {category.map((genre) => (
            <Link onClick={() => setIdGenreSelected(genre.id)} to={`/categories/${genre.name.replaceAll(" ", "-").toLowerCase()}`}>
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