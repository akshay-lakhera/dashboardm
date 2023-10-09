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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  convertStringToFormat,
  makeCapital,
  showDate
} from "src/components/commonfunctions";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import AddUsers from "./addCategory";
import SeoLib from "../../components/CommonComponents/Helmet";
import AddCategory from "./addCategory";
import { toast } from "react-toastify";
import DeleteCategory from "./DeleteConfirmation";
import EditCategory from "./EditCategory";
import { MyTheme } from "src/layouts/customTheme";
import ShowSubCategory from "./showSubCategory";
import { MyIcons } from "src/components/MyIcons";
import BackDropLoader from "src/components/CommonComponents/BackdropLoader";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4
};

function ManageCategory() {
  // modal actions to add users
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    data: null
  });
  const [selectedCategory, setselectedCategory] = useState("");
  const [open, setOpen] = React.useState(false);
  const [editModal, setEditModal] = useState({ open: false, data: null });
const [showBackDrop, setShowBackDrop] = useState(false)
  const [reloadPage, setReloadPage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reloadIt = () => setReloadPage(!reloadPage);

  let ActionButton = (
    <Button variant="contained" onClick={handleOpen} className="cus-btn">
      + Add Attribute
    </Button>
  );
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setOpen(false);
        setShowBackDrop(true)
        let { data } = await API_CALL.category.get({});
        console.log(data);
        setTableData(data.data);
        if (data.data.length) {
          setselectedCategory(data.data[0]);
        setShowBackDrop(false)

        }else{
        setShowBackDrop(false)

        }
      } catch (error) {
        setTableData([]);
        setShowBackDrop(false)

        toast.error("No Data found");
      }
    })();
  }, [reloadPage]);

  

  return (
    <PageContainer title="Sky Dog Attribute Management" description="">
      <DashboardCard title="Attributes">
        {/* <SeoLib title="User Management" /> */}
        <AddCategory
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          reloadIt={reloadIt}
        />
        <DeleteCategory
          reloadIt={reloadIt}
          data={deleteModal}
          handleClose={() => setDeleteModal({ open: false })}
        />
        {editModal.open && (
          <EditCategory
            reloadIt={reloadIt}
            data={editModal}
            handleClose={() => setEditModal({ open: false })}
          />
        )}

{showBackDrop && <BackDropLoader/>}
     
        <Grid container >
          <Grid item xs={12} md={2}   >
                <div className="gap1 categoriesCover w-full">
                   <div
                className="properties coltheme"
                style={{fontWeight:"bold",fontSize:"14px",padding:"20px 15px",cursor:"pointer",}}
             
                  onClick={handleOpen}
                  // variant={
                  //   selectedCategory._id == item?._id ? "contained" : "outlined"
                  // }
                >
                + Add Attributes
                </div>
          {tableData?.map((item) => {
            return (
                <div
                className={`${selectedCategory._id==item._id?"active-properties":"properties"} `}
                  onClick={() => setselectedCategory(item)}
                  variant={
                    selectedCategory._id == item?._id ? "contained" : "outlined"
                  }
                >
                  <div>

             {item?.name} 
                  </div>
             <div>
              <MyIcons.EditIcon fontSize="10px" onClick={()=>{
                setEditModal({open:true,data:item})
              }}/>
                </div>
                </div>
            );
          })}
        </div>
          </Grid>
          <Grid item xs={12} md={10} p={2}>
     <Typography
          textAlign="left"
          // mt={2}
          padding={2}
          // bgcolor="gray"
          borderBottom={1}
          // borderRadius={5}
          fontSize={24}
          fontWeight="bold"
          color="black"
        >
          {makeCapital(selectedCategory?.name)}
        </Typography>
        
        <ShowSubCategory parentCategory={selectedCategory._id} />
          </Grid>
        </Grid>
   

        {/* <BasicTable
          rows={tableData}
          reloadIt={reloadIt}
          deleteModal={deleteModal}
          setEditModal={setEditModal}
          setDeleteMoal={setDeleteModal}
        /> */}

        {/* add new property modal */}
       
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({
  rows,
  reloadIt,
  deleteModal,
  setDeleteMoal,
  setEditModal
}) => {
  const title = {
    fontWeight: "bold",
    fontSize: "17px"
  };

  const deleteIt = async (row) => {
    try {
      const { data } = await API_CALL.category.delete(row._id);
      if (data.success) {
        reloadIt();
        toast.success("Category Deleted");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (rows?.length == 0) {
    return (
      <div style={{ color: "red", width: "!00%", textAlign: "center" }}>
        No Data Found
      </div>
    );
  }

  return (
    <TableContainer sx={{ maxHeight: "70vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" hover>
        <TableHead>
          <TableRow>
            <TableCell style={title}>Sr No</TableCell>

            <TableCell style={title} align="center">
              Name
            </TableCell>
            {/* <TableCell style={title} align="center">
              Wallet Address
            </TableCell> */}
            <TableCell style={title} align="center">
              Created At
            </TableCell>
            <TableCell style={title} align="center">
              Action
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
                {row?.name}
              </TableCell>
              {/* <TableCell align="center" className="tablebox">
                {row.fullName}
              </TableCell>
              <TableCell align="center" className="tablebox">
                {convertStringToFormat(row.walletAddress)}
              </TableCell> */}
              <TableCell align="center" className="tablebox">
                {showDate(row.createdAt)}
              </TableCell>
              <TableCell align="center" className="tablebox">
                <Grid container>
                  <Grid item xs={8}>
                    <EditIcon
                      style={{
                        color: MyTheme.bgColor1
                      }}
                      onClick={() => {
                        setEditModal({ open: true, data: row });
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DeleteIcon
                      style={{
                        color: "red"
                      }}
                      onClick={() => {
                        setDeleteMoal({ open: true, data: row });
                      }}
                    />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ManageCategory;
