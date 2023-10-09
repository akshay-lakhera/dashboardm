import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from '@mui/material/styles';
import twitter from "../../assets/images/profile/twitter.png"
import discord from "../../assets/images/profile/discordicon.png"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { API_CALL } from "src/services/APICalls";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

let initialState = {
title:"",
image:null,
designation:null,
description:""
};
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
function AddArtist({ handleOpen, reloadIt, open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const [allcommunity, setAllCommunity] = useState([])
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    (async()=>{
   try {
      const {data} =await API_CALL.category.get()
  setAllCommunity(data.data)

} catch (error) {
  // console.log("")
}
 })()

  }, [])
  

  const handleSubmit = async () => {
    try {
      // let flag = true;
      // for (const key in formData) {
      //   let field = formData[key];
      //   if (field.trim() == "") flag = false;
      // }
      if (!formData?.title) return toast.error("Name is required");
      if (!formData?.designation) return toast.error("Designation is required");
      if (!formData?.description) return toast.error("Description is required");
      if (!formData?.image) return toast.error("Image is required");
      setshowLoader(true)
      let payload =new FormData()
      payload.append("title",formData?.title)
      payload.append("designation",formData?.designation)
      payload.append("description",formData?.description)
        payload.append("image",formData?.image,formData?.image.name)
      payload.append("step",formData?.step)
      const { data } = await API_CALL.Artist.create(payload);
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        setFormData(initialState);
        reloadIt();
      } else {
        setshowLoader(false);
        toast.error(data.message);
      }
      console.log(data, "<<thisis data");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setshowLoader(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={2} justifyContent="center" alignItems="center" spacing={2}>
       
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22}>
                Add Artist
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                onChange={handleChange}
                value={formData?.title}
                type="string"
                placeholder="Enter  Title"
              />
            </Grid>
         
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="designation"

                onChange={handleChange}
                value={formData?.designation}
                type="text"
                placeholder="Designation"
              />
            </Grid>
            {/* <Grid item xs={6}>
              <TextField
                fullWidth
                name="indsutry"
                onChange={handleChange}
                value={formData?.indsutry}
                type="string"
                placeholder="Enter Industry Name"
              />
            </Grid> */}
       
            <Grid item xs={12}>
              <textarea
                fullWidth
                name="description"
                onChange={handleChange}
                value={formData?.description}
                type="string"
                style={{width:"100%",maxHeight:"5rem",padding:"5px"}}
                rows={5}
                placeholder="Enter Short Description"
              />
            </Grid>
     {/* <Grid item xs={2}> <img src={twitter} style={{width:"2rem",objectFit:"contain"}}/></Grid>
            <Grid item xs={10} display="flex">
              

              <TextField
                fullWidth
                name="twitter"
                onChange={(e)=>{
                  setFormData({...formData,socialMedia:{...formData.socialMedia,twitter:e.target.value}})
                }}
                value={formData?.socialMedia.twitter}
                type="string"
                placeholder="Enter Twitter Link"
              />
            </Grid>
                     <Grid item xs={2}> <img src={discord} style={{width:"2rem",objectFit:"contain"}}/></Grid>
            <Grid item xs={10} display="flex">
            
              <TextField
                fullWidth
                name="discord"
         onChange={(e)=>{
                  setFormData({...formData,socialMedia:{...formData.socialMedia,discord:e.target.value}})
                }}
                value={formData?.socialMedia?.discord}
                type="string"
                placeholder="Enter Discord Link"
              />
            </Grid>
             */}
            {/* <Grid item xs={12}>
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData?.category}
          label="category" name="category" 
          onChange={handleChange}
        >
          <MenuItem value={""}>Select</MenuItem>
          {allcommunity.map(item=>{
            return <MenuItem value={item._id}>{item.name}</MenuItem>
          })}

         
        </Select>
      </FormControl>
            </Grid> */}
                 <Grid item xs={12} textAlign="center">
            {formData?.image == null ? <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file"  onChange={e=>setFormData({...formData,image:e.target.files[0]})}/>
</Button>:
<img src={URL.createObjectURL(formData?.image)} style={{width:"16rem",objectFit:"contain"}}/>
}
            </Grid>
           
            <Grid item xs={8} textAlign="center">
              {showLoader ? (
                <CustomLoader />
              ) : (
                <Button
                  variant="contain"
                  onClick={handleSubmit}
                  className="cus-btn"
                  fullWidth
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const ShowStar = () => <span style={{ color: "red" }}>*</span>;
export default AddArtist;
