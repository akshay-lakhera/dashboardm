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
import AddCategory from "./AddArtist";
import { toast } from "react-toastify";
import DeleteCategory from "./DeleteConfirmation";
import EditCategory from "./EditArtist";
import { MyTheme } from "src/layouts/customTheme";
import NftCard, { ArtistCard, CommunityCard, PartnerCard, RoadmapCard } from "src/components/CommonComponents/NftCard";
import EditRoadmap from "./EditArtist";
import ViewArtist from "./ViewArtist";
import BackDropLoader from "src/components/CommonComponents/BackdropLoader";
function ManageArtist() {
  // modal actions to add users
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    data: null
  });
  const [open, setOpen] = React.useState(false);
  const [editModal, setEditModal] = useState({open:false,data:null})
  const [reloadPage, setReloadPage] = useState(false);
  const [viewModal, setviewModal] = useState({show:false,data:null})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reloadIt = () => setReloadPage(!reloadPage);
  const onclickEdit=(data)=>setEditModal({show:true,data})
  const [showBackDrop, setshowBackDrop] = useState(false)

  let ActionButton = (
    <Button variant="contained" onClick={handleOpen} className="cus-btn">
      Add
    </Button>
  );
  const openViewModal=(data)=>{
    setviewModal({show:true,data})
  }
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setOpen(false);
        setshowBackDrop(true)
        let { data } = await API_CALL.Artist.get({});
        if(data.success){
          setshowBackDrop(false)
             console.log(data);
        setTableData(data.data);
        }else{
          setshowBackDrop(false)
        }
     
      } catch (error) {
        toast.error("No Data found");
        console.log(error)
         setTableData([]);
          setshowBackDrop(false)
      }
    })();
  }, [reloadPage]);

  return (
    <PageContainer title="Sky Dog Artist Management" description="">
      <DashboardCard title="Artist" action={ActionButton}>
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
       {editModal.open && <EditCategory
          reloadIt={reloadIt}
          data={editModal}
          handleClose={() => setEditModal({ open: false })}
        />}
        <EditRoadmap handleClose={()=>setEditModal({open:false,data:{}})} reloadIt={reloadIt} open={editModal.show} roadmapData={editModal.data}  />
        <ViewArtist openViewModal={openViewModal} handleClose={()=>setviewModal({open:false,data:{}})}  open={viewModal.show} roadmapData={viewModal.data}  />
       {showBackDrop && <BackDropLoader/>}
        <BasicTable
        openViewModal={openViewModal}
          rows={tableData}
          reloadIt={reloadIt}
          onclickEdit={onclickEdit}
          deleteModal={deleteModal}
          setEditModal={setEditModal}
          setDeleteMoal={setDeleteModal}
        />
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ openViewModal,onclickEdit,rows, reloadIt, deleteModal, setDeleteMoal,setEditModal }) => {
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
  <Grid container spacing={2}>

    {rows?.map((item,key)=>{
  return <Grid item xs={12} md={4} sm={6}  ><ArtistCard openViewModal={openViewModal} onclickEdit={onclickEdit}  reloadIt={reloadIt} key={item._id} item={item}/> </Grid>
})}
  </Grid>

)

};
export default ManageArtist;
