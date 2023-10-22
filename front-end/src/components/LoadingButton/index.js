import { CircularProgress } from "react-cssfx-loading";

const LoadingButton = ({ event, styleButton, loading, message }) => {
  return (
    <button onClick={event ? event : null} type="submit" className={styleButton} >
    	{loading ? <Icone event={event} /> : message}
    </button>
  );
};

const Icone = ({ event }) => { 
  return ( 
  	<CircularProgress color={event ? "#808080" : "#000000"} height="2em" width="2em" /> 
  )
}

export default LoadingButton;
