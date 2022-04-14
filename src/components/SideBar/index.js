import { IoIosClose } from "react-icons/io";


export const SideBar = () => {
  
  return (
      <div className="SideBar">
        <button className="Close-Sidebar">
          <IoIosClose size={50} />
        </button>
        <button className="Buttons-Sidebar">Movies </button>
        <button className="Buttons-Sidebar">Series </button>
        <button className="Buttons-Sidebar">Categories </button>
      </div>
    );
    
};