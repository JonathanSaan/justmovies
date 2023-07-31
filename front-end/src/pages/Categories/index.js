import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";

import Header from "../../components/Header";
import APIKey from "../../mocks/api";
import "./style.scss";

const Categories = () => {
  const [category, setCategories] = useState([]);

  const LoadGenres = async () => {
    const respost = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`
    );
    setCategories(respost.data.genres);
  };

  useEffect(() => {
    LoadGenres();
  }, []);

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>genre - justmovies</title>
        <meta name="description" content="Explore movie genres on justmovies. Browse through a variety of movie genres and find your favorite movies." />
        <meta name="keywords" content="movie genres, movie categories, justmovies genres" />
      </Helmet>
      <div className="category">
        <div className="container_category">
          <h1 className="container_category-title">Genre</h1>
          {category &&
            category.map((genre) => (
              <div className="container_category_genre" key={genre.id}>
                <Link
                  to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}
                  aria-label={genre.name}
                >
                  <button className="container_category_genre-button">
                    {genre.name}
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Categories;
