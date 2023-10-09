import React, { useEffect, useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API_CALL } from "src/services/APICalls";
import {
  convertStringToFormat,
  showDate
} from "src/components/commonfunctions";
import { Button } from "@mui/material";
import AddUsers from "./AddUsers";
import SeoLib from "../../components/CommonComponents/Helmet";
function ManageUsers() {
  // modal actions to add users
  const [open, setOpen] = React.useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reloadIt = () => setReloadPage(!reloadPage);

  let ActionButton = (
    <Button variant="contained" onClick={handleOpen} className="cus-btn">
      Add
    </Button>
  );
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    (async () => {
      setOpen(false);
      let { data } = await API_CALL.users.get({});
      console.log(data);
      setTableData(data.data);
    })();
  }, [reloadPage]);

  return (
    <PageContainer title="Sky Dog Users Management" description="">
      <DashboardCard title="Manage Users" action={ActionButton}>
        {/* <SeoLib title="User Management" /> */}
        <AddUsers
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          reloadIt={reloadIt}
        />

        <BasicTable rows={tableData} />
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ rows }) => {
  const title = {
    fontWeight: "bold",
    fontSize: "17px"
  };
  return (
    <TableContainer sx={{ maxHeight: "70vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" hover>
        <TableHead>
          <TableRow>
            <TableCell style={title}>Sr No</TableCell>
            <TableCell style={title}>Role</TableCell>
            <TableCell style={title} align="center">
              Full Name
            </TableCell>
            <TableCell style={title} align="center">
              Wallet Address
            </TableCell>
            <TableCell style={title} align="center">
              Created At
            </TableCell>
            {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={row._id}
              style={
                {
                  // background: index % 2 == 0 ? "#e8e8e8" : "white"
                }
              }
              // key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="tablebox">
                {index + 1}
              </TableCell>
              <TableCell align="center" className="tablebox">
                {row.role}
              </TableCell>
              <TableCell align="center" className="tablebox">
                {row.fullName}
              </TableCell>
              <TableCell align="center" className="tablebox">
                {convertStringToFormat(row.walletAddress)}
              </TableCell>
              <TableCell align="center" className="tablebox">
                {showDate(row.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ManageUsers;
