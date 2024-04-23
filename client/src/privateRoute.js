import Error from "./pages/Error";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  return user ? children : <Error />;
};

export default PrivateRoute;
