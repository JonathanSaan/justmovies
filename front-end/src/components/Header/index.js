import { useState, useRef, useEffect } from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoIosStar, IoIosSearch } from "react-icons/io";
import { MdInstallMobile } from "react-icons/md";

import SideBar from "../SideBar";
import DropdownAccount from "../DropdownAccount";
import DropdownCategory from "../DropdownCategory";
import resetComponents from "../../utils/ResetComponents";
import APIKey from "../../mocks/api";
import "./style.scss";

const Header = () => {
  let navigate = useNavigate();
  const [category, setCategories] = useState([]);
  const refOne = useRef(null);
  const [searchesDropdown, setSearchesDropdown] = useState([]);
  const [typedSearch, setTypedSearch] = useState("");
  
  const profileString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const profile = profileString ? JSON.parse(profileString) : null;
  
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  
  if (!profileString) {
    handleSignOut();
  };
  
  const onChange = async (e) => {
    const searchTerm = e.target.value;
    setTypedSearch(searchTerm);

    if (searchTerm === "" || searchTerm.length < 2) {
      setSearchesDropdown([]);
      return;
    }

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`);
    setSearchesDropdown(response.data.results);
  };

  const searchMovie = (e) => {
    e.preventDefault();
    if (typedSearch === "") {
      return;
    }
    navigate(`/search?q=${typedSearch.replaceAll(" ", "+")}`);
    resetComponents(setSearchesDropdown);
  };
  
  const handleOutsideDropdownClick = (e) => {
  	if (refOne.current && !refOne.current.contains(e.target)) {
  	  setSearchesDropdown([]);
  	}
  }
  
  const LoadGenres = async () => {
    const respost = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`
    );
    setCategories(respost.data.genres);
  };
  
  useEffect(() => {
    document.addEventListener("click", handleOutsideDropdownClick, true);
    LoadGenres();
  }, []);
  
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <SideBar category={category} profile={profile} handleSignOut={handleSignOut} />
      <header className="header">
        <Link to="/" className="header-title">
          <img className="header-title-icon" src="/cassette-tape.png" alt="icon" />
          justmovies
        </Link>
        <DropdownCategory category={category} />
        <form className="header_search_form" onSubmit={searchMovie}>
          <input
            type="text"
            className="header_search_form-search"
            value={typedSearch}
            placeholder="Search..."
            onChange={onChange}
          />

          <button
            type="submit"
            className="header_search_form-button"
            aria-label="search"
          >
            <IoIosSearch size={28} color="#FFF" />
          </button>
          {typedSearch && searchesDropdown.length > 0 && (
            <div className="header_search_form_dropdown" onSubmit={handleOutsideDropdownClick} ref={refOne}>
              {searchesDropdown
                .filter((movie) => {
                  const searchTerm = typedSearch.toLowerCase();
                  const fullName = movie.title.toLowerCase();

                  return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
                })
                .slice(0, 3)
                .map((movie) => (
                  <div key={movie.id}>
                    <Link
                      to={`/movies/${movie.id}`}
                      onClick={onChange}
                      key={movie.id}
                      className="header_search_form_dropdown_card"
                    >
                      <img
                        className="header_search_form_dropdown_card-image"
                        height="85"
                        width="65"
                        src={
                          movie.poster_path ? imagePath + movie.poster_path : imageError
                        }
                        alt={movie.title}
                      />
                      <div className="header_search_form_dropdown_card_description">
                        <h2 className="header_search_form_dropdown_card_description-title">
                          {movie.title}
                        </h2>
                        <span className="header_search_form_dropdown_card_description-synopsis">
                          {movie.overview.length > 30 ? (
                            `${movie.overview.substring(0, 30)}...`
                          ) : (
                            <p className="header_search_form_dropdown_card_description-synopsis">
                              {movie.overview}
                            </p>
                          )}
                        </span>
                        <div className="header_search_form_dropdown_card_description_vote">
                          <IoIosStar
                            className="header_search_form_dropdown_card_description_vote-icon"
                            size={15}
                            color="yellow"
                          />
                          <p>
                            {movie.vote_average.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <hr className="header_search_form_dropdown-line" />
                  </div>
                ))}
              <Link
                to={`/search?q=${typedSearch.replaceAll(" ", "+")}`}
                onClick={onChange}
                className="header_search_form_dropdown-title"
              >
                <h3>See more</h3>
              </Link>
            </div>
          )}
        </form>
        <Link to="/apps" className="app-button" title="Install Apps">
          <MdInstallMobile size={30} color="#f3f3f3" />
        </Link>
        <DropdownAccount profile={profile} handleSignOut={handleSignOut} />
      </header>
    </>
  );
};

export default Header;
