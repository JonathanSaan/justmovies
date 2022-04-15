import { useState } from "react";
import { SideBar } from "../SideBar"
import { IoMenu } from "react-icons/io5"; 
import { IoIosSearch } from "react-icons/io";

export const Header = () => {
  
  const [sidebar, SetSideBar] = useState(false);
  
  const toggleSideBar = () => {
    SetSideBar(!sidebar)
    console.log('click')
  };
  
  return (
    <>
      <header className="Header">
        <button className="Menu" onClick={toggleSideBar}>
          <IoMenu size={40} color="#FFF" />
        </button>
        <form>
          <input type="text" placeholder="Search..."/>
          <button className="Search">
            <IoIosSearch size={28} color="#FFF" />
          </button>
        </form>
      </header>
      <SideBar toggleSideBar={toggleSideBar} sidebar={sidebar} />
    </>
  );
  
};