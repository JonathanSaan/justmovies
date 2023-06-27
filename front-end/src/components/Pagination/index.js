import { Pagination as Paginate } from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagination = ({ page, totalPage, paginate }) => {
  return (
    <Stack sx={{ mt: { lg: "70px", xs: "70px" } }} alignItems="center">
      <Paginate
        shape="rounded"
        page={page !== "" ? parseInt(page) : 1}
        count={totalPage}
        onChange={paginate}
      />
    </Stack>
  );
};

export default Pagination;
