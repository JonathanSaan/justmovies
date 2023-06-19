import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import "./style.scss";

const Error = () => {
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>justmovies</title>
      </Helmet>
      <div className="error">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page not found. </h2>
      </div>
    </HelmetProvider>
  );
};

export default Error;
