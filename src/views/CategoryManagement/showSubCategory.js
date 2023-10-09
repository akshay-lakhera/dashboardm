import { Box, Button, Chip, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MyIcons } from "src/components/MyIcons";
import { makeCapital } from "src/components/commonfunctions";
import { API_CALL } from "src/services/APICalls";

function ShowSubCategory({ parentCategory }) {
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


  const [subCategoryData, setSubCategoryData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [seletectedSubCategory, setseletectedSubCategory] = useState(null)
    const [reloadPage, setReloadPage] = useState(false)
     const [newPropertyData, setnewPropertyData] = useState({
    name: null,
    parentCategory: null
  });
  const [handleNewPropertyModal, sethandleNewPropertyModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReloadPage=()=>setReloadPage(!reloadPage)
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API_CALL.SubCategory.get({
          parentCategory: parentCategory
        });
      
          setSubCategoryData(data.data);
        
      } catch (error) {
        console.log(error);
        setSubCategoryData([]);
      }
    })();
    return () => {};
  }, [parentCategory,reloadPage]);
  console.log(seletectedSubCategory,"<<<")
const editSubCategory=async ()=>{
    try {
        const {data} =await API_CALL.SubCategory.update({id:seletectedSubCategory._id,...seletectedSubCategory})
        if(data.success){
            toast.success("Updatation Successful")
            handleReloadPage()
            handleClose()
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteSubCategory=async ()=>{
    try {
        const {data} =await API_CALL.SubCategory.delete(seletectedSubCategory._id)
        if(data.success){
            toast.success(" Deletion Successfull")
            handleReloadPage()
           sethandleNewPropertyModal(false)
        }
    } catch (error) {
        console.log(error)
    }
}

   const addNewSubCategory = async () => {
    try {
      const { data } = await API_CALL.SubCategory.create({ ...newPropertyData,parentCategory });
      if (data.success) {
        toast.success("New Property Added");
        handleReloadPage()

        sethandleNewPropertyModal(false)
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (<>
  <div className="flex-end" style={{marginTop:"20px"}}>
          <Button  variant="outlined" onClick={() => sethandleNewPropertyModal(true)}>
            + Add Property
          </Button>
        </div>
    <Grid container columnSpacing={1} mt={2} rowSpacing={2}>
      {subCategoryData?.map((item) => {
        return (
          <Grid item xs={4} md={2}>
     <Chip label={makeCapital(item?.name)} style={{width:"100%"}} onClick={()=>{
        setseletectedSubCategory(item)
        handleOpen()
     }}/>
          </Grid>
        );
      })}
      {subCategoryData.length ==0 && <Typography width="100%" textAlign="center" color="red">No Data Found</Typography>}
 </Grid>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography textAlign="center" fontWeight="bold" fontSize={20} mb={3}>Edit Property</Typography>
         <TextField mb={2} fullWidth value={seletectedSubCategory?.name} onChange={(e)=>setseletectedSubCategory({...seletectedSubCategory,name:e.target.value})}/>

        <div className="flex-center" style={{marginTop:"20px"}}>

         <Button fullWidth onClick={editSubCategory}  variant="contained">Submit</Button>
        </div>
       <div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between",marginTop:"1rem"}}>

        <Button color="error" onClick={deleteSubCategory}>Delete</Button>
        <Button color="primary"  variant="outlined" onClick={handleClose}>Close</Button>
        </div>
       </div>
        </Box>
      </Modal>
{/* add category modal */}
 <Modal
          open={handleNewPropertyModal}
          onClose={() => sethandleNewPropertyModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography mb={2} id="modal-modal-title" variant="h6" component="h2" textAlign="center" fontSize={20}>
              Add New Property
            </Typography>
            <TextField 
            placeholder="Enter Property Name"
              value={newPropertyData.name}
             
              fullWidth
              onChange={(e) =>
                setnewPropertyData({ ...newPropertyData, name: e.target.value })
              }
            />
            <div className="flex" style={{marginTop:"20px"}}>
              <Button onClick={addNewSubCategory} variant="contained" fullWidth> Submit</Button>
            </div>
          </Box>
        </Modal>
   
  </>
  );
}

export default ShowSubCategory;
