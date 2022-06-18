import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMenu } from "react-icons/io5"; 
import { IoIosSearch } from "react-icons/io";

//import { Dropdown } from "../Dropdown";
import { SideBar } from "../SideBar";
import "./style.scss";



export const Header = () => {
  
  let navigate = useNavigate();
  
  const [TypedSearch, SetTypedSearch] = useState();
  
  const SearchMovie = (e) => {
    if (TypedSearch === "") {
      return e;
    };
    
    e.preventDefault();
    SetTypedSearch(TypedSearch);
    navigate(`/search/${TypedSearch.replaceAll(" ", "+")}`);
  };
  
  const [sidebar, SetSideBar] = useState(false);
  const toggleSideBar = () => {
    SetSideBar(!sidebar)
  };
  
  
  return (
    <>
      <header className="Header">
        <button className="Menu" onClick={toggleSideBar}>
          <IoMenu size={40} color="#FFF" />
        </button>
        <form onSubmit={SearchMovie}>
          <input type="text" value={TypedSearch} placeholder="Search..." onChange={(e) => SetTypedSearch(e.target.value)} />
          <button type="submit" className="Search">
              <IoIosSearch size={28} color="#FFF" />
          </button>
          
          
        </form>
      </header>
      <SideBar toggleSideBar={toggleSideBar} sidebar={sidebar} />
    </>
  );
};
          //<Dropdown />