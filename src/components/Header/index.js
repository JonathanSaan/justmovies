import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5"; 
import { IoIosSearch } from "react-icons/io";


import { SideBar } from "../SideBar"

export const Header = () => {
  
  const [search, setSearch] = useState()
  const [TypedSearch, SetTypedSearch] = useState()
  
  const SearchMovie = (e) => {
    e.preventDefault()
    SetTypedSearch(search)
    console.log(search)
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
            <Link className="Link" to="/Search" search={search}>
              <IoIosSearch size={28} color="#FFF" />
            </Link>
          </button>
        </form>
      </header>
      <SideBar toggleSideBar={toggleSideBar} sidebar={sidebar} />
    </>
  );
  
};