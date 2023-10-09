import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_CALL } from "src/services/APICalls";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const columns = [
  { id: "sr", label: "Index", minWidth: 30 },
  { id: "company", label: "Company", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "size",
    label: "View",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "density",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2)
  }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767)
];

export default function ContactTable({ tableData,reloadPage }) {
  const [page, setPage] = React.useState(0);

  const [showDetailModal, setshowDetailModal] = useState({
    show: false,
    data: null
  });

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteContact = async (id) => {
    try {
      const { data } = await API_CALL.Contact.delete(id);
      if (data.success) {
        reloadPage()
        toast.success("Successfully Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="left">{index + 1}</TableCell>

                  <TableCell align="left">{row?.company}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => {
                        setshowDetailModal({ show: true, data: row });
                      }}
                    >
                      View Data
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={()=>deleteContact(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {showDetailModal.show && (
        <Modal
          open={showDetailModal.show}
          onClose={() => setshowDetailModal({ show: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Message
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {showDetailModal?.data.message}
            </Typography>
            <br />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={() => setshowDetailModal({ show: false })}>
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </Paper>
  );
}
