import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import SideBar from "../SideBar";
import "./style.scss";

const Header = () => {
  let navigate = useNavigate();

  const [TypedSearch, SetTypedSearch] = useState("");

  const SearchMovie = (e) => {
    e.preventDefault();
    
    if (TypedSearch === "") {
      return;
    }
    navigate(`/search/${TypedSearch.replaceAll(" ", "+")}`);
  };
  
  return (
    <>
      <header className="header">
        <form className="header_search-from" onSubmit={SearchMovie}>
          <input
            type="text"
            className="header_search-from_search"
            value={TypedSearch}
            placeholder="Search..."
            onChange={(e) => SetTypedSearch(e.target.value)}
          />

          <button type="submit" className="header_search-from_button" aria-label="search">
            <IoIosSearch size={28} color="#FFF" />
          </button>
        </form>
      </header>
      <SideBar />
    </>
  );
};

export default Header;