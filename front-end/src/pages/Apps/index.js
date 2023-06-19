import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import "./style.scss";

const Apps = () => { 
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>Official justmovies Apps Download</title>
      </Helmet>
      <div className="apps">
        <h1>coming soon.</h1>
      </div>
    </HelmetProvider>
  )
}

export default Apps;
