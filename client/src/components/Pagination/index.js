import { Pagination as Paginate, styled } from "@mui/material";
import Stack from "@mui/material/Stack";

const StyledPaginate = styled(Paginate)(({ theme }) => ({
  "button": {
    "&:hover": {
      backgroundColor: "#0c0c0c",
      color: "#f3f3f3",
    },
  },
  "& .MuiPaginationItem-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
    color: "#f3f3f3",
    height: "3rem",
    width: "3rem",
    border: "1px solid #808080",
    borderRadius: ".5rem",
    "&.Mui-selected": {
      backgroundColor: "#0c0c0c !important",
    },
  },
}));

const Pagination = ({ page, totalPage, paginate }) => {
  return (
    <>
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
    </>
  );
};

export default Pagination;
