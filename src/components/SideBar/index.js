import { IoIosClose } from "react-icons/io";


export const SideBar = ({ sidebar, toggleSideBar }) => {
  
  return (
      <div className={sidebar ? "SideBarActive" : "SideBar"}>
        <button onClick={toggleSideBar} className="Close-Sidebar">
          <IoIosClose size={60} color="#FFF" />
        </button>
        <button className="Buttons-Sidebar">Home </button>
        <button className="Buttons-Sidebar">Categories </button>
      </div>
    );
    
};