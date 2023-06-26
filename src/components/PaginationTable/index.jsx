import { Box, Pagination, TablePagination } from "@mui/material";

const TablePaginationActions = (props) => {
  const { count, page, onPageChange } = props;

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Pagination
        onPage
        onChange={onPageChange}
        size="small"
        page={page}
        count={count}
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

const PaginationTable = (props) => {
  const { page, rows, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    props;

  return (
    <TablePagination
      colSpan={10}
      count={rows}
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
          backgroundColor: "#fff",
          padding: "0 1rem",
          display: "block",
          "& .MuiToolbar-root": {
            paddingLeft: 0,
            "& .MuiTablePagination-spacer": {
              display: "none",
            },
            "& .MuiTablePagination-displayedRows": {
              display: "none",
            },
            "& .MuiBox-root": {
              marginLeft: "auto",
            },
          },
        },
      }}
    />
  );
};

export default PaginationTable;
