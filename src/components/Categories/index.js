import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "../Header";
import "./style.scss";

const Categories = ({ category }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Helmet>
        <title>genre - justmovies</title>
      </Helmet>
      <div className="category">
        <div className="container_category">
          <h1 className="container_category-title">Genre</h1>
          {category.map((genre) => (
            <div className="container_category_genre">
              <Link
                to={`/genre/${genre.id}/${genre.name
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}
              >
                <button className="container_category_genre-button">
                  {genre.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
