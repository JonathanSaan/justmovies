import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMenu } from "react-icons/io5"; 
import { IoIosSearch } from "react-icons/io";

import "./style.scss"
import { SideBar } from "../SideBar"

export const Header = () => {
  const [search, setSearch] = useState()
  let navigate = useNavigate();
  
  const [TypedSearch, SetTypedSearch] = useState()
  
  const SearchMovie = (e) => {
    
   navigate(`/search/${search.replaceAll(" ", "+")}`)
    e.preventDefault()
    SetTypedSearch(search)
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
        <form>
          <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
          <button onClick={SearchMovie} className="Search">
              <IoIosSearch size={28} color="#FFF" />
          </button>
        </form>
      </header>
      <SideBar toggleSideBar={toggleSideBar} sidebar={sidebar} />
    </>
  );
  
};