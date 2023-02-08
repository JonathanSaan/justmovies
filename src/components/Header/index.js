import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import SideBar from "../SideBar";
import "./style.scss";

const Header = () => {
  let navigate = useNavigate();

  const [TypedSearch, SetTypedSearch] = useState();

  const SearchMovie = (e) => {
    if (TypedSearch === "") {
      return e;
    }

    e.preventDefault();
    SetTypedSearch(TypedSearch);
    navigate(`/search/${TypedSearch.replaceAll(" ", "+")}`);
  };

  const [sidebar, SetSideBar] = useState(false);
  const toggleSideBar = () => {
    SetSideBar(!sidebar);
  };

  return (
    <>
      <header className="header">
        <button className="header-menu" onClick={toggleSideBar}>
          <IoMenu size={40} color="#FFF" />
        </button>

        <form className="header_search-from" onSubmit={SearchMovie}>
          <input
            type="text"
            className="header_search-from_search"
            value={TypedSearch}
            placeholder="Search..."
            onChange={(e) => SetTypedSearch(e.target.value)}
          />

          <button type="submit" className="header_search-from_button">
            <IoIosSearch size={28} color="#FFF" />
          </button>
        </form>
      </header>
      <SideBar toggleSideBar={toggleSideBar} sidebar={sidebar} />
    </>
  );
};

export default Header;