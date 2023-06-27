import "./style.scss";
import CircularProgress from "react-cssfx-loading";

const Loading = () => {
  return (
    <div className="ContainerLoading">
      <CircularProgress color="#d3d3d3f9" height="4em" width="4em" />
    </div>
  );
};

export default Loading;
