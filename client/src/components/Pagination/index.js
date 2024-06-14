import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./style.scss";

const PaginationComponent = ({ page, totalPage, paginate }) => {
  return (
    <div className="pagination_container">
      {totalPage && (
        <Stack sx={{ mt: { lg: "70px", xs: "70px" } }} alignItems="center">
          <Pagination
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

export default PaginationComponent;
