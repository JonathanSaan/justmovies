import { CircularProgress } from "react-cssfx-loading";

const LoadingButton = ({ event, styleButton, loading, message }) => {
  return (
    <button onClick={event ? event : null} type="submit" disabled={loading} className={styleButton} >
    	{loading ? <Icon event={event} /> : message}
    </button>
  );
};

const Icon = ({ event }) => { 
  return ( 
  	<CircularProgress color={event ? "#808080" : "#000000"} height="2em" width="2em" /> 
  )
}

export default LoadingButton;
