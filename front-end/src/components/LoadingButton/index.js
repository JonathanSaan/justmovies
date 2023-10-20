import { CircularProgress } from "react-cssfx-loading";

const LoadingButton = ({ styleButton, loading, message }) => {
  return (
    <button type="submit" className={styleButton} >
    	{loading ? <Icone /> : message}
    </button>
  );
};

const Icone = () => { 
  return ( 
  	<CircularProgress color="#000000" height="2em" width="2em" /> 
  )
}

export default LoadingButton;
