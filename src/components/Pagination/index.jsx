import { useState } from "react";
import { Box, Pagination, TablePagination } from "@mui/material";

const TablePaginationActions = () => {
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Pagination
        size="small"
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "#FFF",
            transition: "0.3s",
          },
          "& .MuiPaginationItem-root.Mui-disabled": {
            backgroundColor: "#9E9494",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            border: "1px solid #AF1582",
            backgroundColor: "#FFF",
            color: "#AF1582",
          },
          "& .MuiPaginationItem-root.MuiPaginationItem-ellipsis": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Box>
  );
};

const PaginationTable = (rows) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      className="shadow"
      colSpan={10}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
      sx={{
        "&.MuiTablePagination-root": {
          border: "none",
          backgroundColor: "#f0f0f0",
          padding: "0 1rem",
        },
      }}
    />
  );
};

export default PaginationTable;
