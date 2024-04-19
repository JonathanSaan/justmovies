import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import "./style.scss";

const DropdownCategory = ({ category }) => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#323537",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#323537",
      width: "32.3rem",
      maxWidth: "32.3rem",
      fontSize: "1rem",
    },
  }));

  return (
    <HtmlTooltip
      title={
        <div className="menu-category">
          {category &&
            category.map((genre) => (
              <NavLink
                activeclassname="active"
                to={`/genre/${genre.id}/${genre.name
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}
                aria-label={genre.name}
                className="menu-container-link"
                key={genre.id}
              >
                <span className="Button-Label">{genre.name}</span>
              </NavLink>
            ))}
        </div>
      }
      arrow
      placement="bottom-start"
    >
      <button className="dropdown-category-button">Genre</button>
    </HtmlTooltip>
  );
};

export default DropdownCategory;
