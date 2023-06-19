import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (type, message) => {
  return toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default Notification;
