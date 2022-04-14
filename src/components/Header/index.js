import { IoMenu } from "react-icons/io5"; 
import { IoIosSearch } from "react-icons/io";

export const Header = () => {
  return (
    <>
      <header className="Header">
        <button className="Menu">
          <IoMenu size={40} color="#FFF" />
        </button>
        <form>
          <input type="text" placeholder="Search..."/>
          <button className="Search">
            <IoIosSearch size={28} color="#FFF" />
          </button>
        </form>
      </header>
    </>
  );
  
};