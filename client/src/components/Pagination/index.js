import { Pagination as Paginate, styled } from "@mui/material";
import Stack from "@mui/material/Stack";

import "./style.scss";

const StyledPaginate = styled(Paginate)(({ theme }) => ({
  "button": {
    "&:hover": {
      backgroundColor: "#0c0c0c",
      color: "#f3f3f3",
    },
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiPaginationItem-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#323537",
    color: "#f3f3f3",
    height: "3rem",
    width: "3rem",
    borderRadius: ".5rem",
    "&.Mui-selected": {
      backgroundColor: "#0c0c0c",
      border: "1px solid #808080",
    },
  },
}));

const Pagination = ({ page, totalPage, paginate }) => {
  return (
    <div className="pagination_container">
      {totalPage && (
        <Stack sx={{ mt: { lg: "70px", xs: "70px" } }} alignItems="center">
          <StyledPaginate
            size="small"
            totalPage
            page={page !== "" ? parseInt(page) : 1}
            count={totalPage}
            onChange={paginate}
          />
        </Stack>
      )}
    </div>
  );
};

export default Pagination;
