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
  showDate
} from "src/components/commonfunctions";
import { Button, Grid } from "@mui/material";
import SeoLib from "../../components/CommonComponents/Helmet";
import AddCategory from "./addSlider";
import { toast } from "react-toastify";
import DeleteCategory from "./DeleteConfirmation";
import EditCategory from "./EditSlider";
import { MyTheme } from "src/layouts/customTheme";
import NftCard, { CommunityCard, PartnerCard, SliderCard } from "src/components/CommonComponents/NftCard";
import EditSlider from "./EditSlider";
import BackDropLoader from "src/components/CommonComponents/BackdropLoader";
function ManageSlider() {
  // modal actions to add users
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    data: null
  });
  const [open, setOpen] = React.useState(false);
  const [editModal, setEditModal] = useState({open:false,data:null})
  const [reloadPage, setReloadPage] = useState(false);
  const [showBackDrop, setshowBackDrop] = useState(false)
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
      try {
        setOpen(false);
        setshowBackDrop(true)
        let { data } = await API_CALL.Slider.get({});
        console.log(data);
        if(data.success){
     setTableData(data.data);
        setshowBackDrop(false)
        }else{
        setshowBackDrop(false)
        }
   
      } catch (error) {
           setshowBackDrop(false)
        toast.error("No Data found");
        console.log(error)
      }
    })();
  }, [reloadPage]);

  return (
    <PageContainer title="Sky Dog Home Page Slider Management" description="">
      <DashboardCard title="Home Page Slider" action={ActionButton}>
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
       {editModal.open && <EditSlider
          reloadIt={reloadIt}
          data={editModal.data}
          open={editModal.open}
          handleClose={() => setEditModal({ open: false })}
        />}
{showBackDrop && <BackDropLoader/>}

        <BasicTable
          rows={tableData}
          reloadIt={reloadIt}
          deleteModal={deleteModal}
          setEditModal={setEditModal}
          setDeleteMoal={setDeleteModal}
        />
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ rows, reloadIt, deleteModal, setDeleteMoal,setEditModal }) => {
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
  if(rows?.length == 0){
    return <div style={{color:"red",width:"!00%",textAlign:"center"}}>No Data Found</div>
  }
return  (
  <Grid container spacing={2} justifyContent="center">

    {rows?.map((item,key)=>{
  return <Grid item xs={12} sm={6}  md={4}><SliderCard clickEdit={()=>setEditModal({open:true,data:item})} reloadIt={reloadIt} key={item._id} item={item}/> </Grid>
})}
  </Grid>

)
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

                      color:MyTheme.bgColor1
                    }}
                    onClick={() => {
                        setEditModal({ open: true, data: row });
                      }} />
                  </Grid>
                  <Grid item xs={4}>
                    <DeleteIcon
                    style={{

                      color:"red"
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
export default ManageSlider;
