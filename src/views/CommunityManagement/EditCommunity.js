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
import { useNavigate } from "react-router";

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
socialMedia:{
  discord:"",
  facebook:"",twitter:""
},
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
function EditCommunity({ handleOpen, reloadIt, open, data,handleClose }) {
  const [formData, setFormData] = useState(data);
  const [showLoader, setshowLoader] = useState(false);
  const [allcommunity, setAllCommunity] = useState([])
  const navigate=useNavigate()
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
      if (!formData?.title) return toast.error("Name are required");
      if (!formData?.description) return toast.error("Category are required");
      if (!formData?.image) return toast.error("Image is required");
      setshowLoader(true)
      let payload =new FormData()
      payload.append("title",formData?.title)
      payload.append("description",formData?.description)
      payload.append("socialMedia",JSON.stringify(formData?.socialMedia))
      if(typeof formData.image == "object"){

        payload.append("image",formData?.image,formData?.image.name)
      }

      const { data } = await API_CALL.Community.update(payload,formData._id);
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        setFormData(initialState);
        handleClose()
        reloadIt();
        navigate("/community-management")
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
          <Grid container rowSpacing={2} justifyContent="center" alignItems="center">
       
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22}>
                Edit Community
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                onChange={handleChange}
                value={formData?.title}
                type="string"
                placeholder="Enter Community Name"
              />
            </Grid>
            <Grid item xs={12}>
              <textarea
                fullWidth
                name="description"
                onChange={handleChange}
                value={formData?.description}
                type="string"
                style={{width:"100%",maxHeight:"5rem"}}
                rows={5}
                placeholder="Enter Community Short Description"
              />
            </Grid>
     <Grid item xs={2}> <img src={twitter} style={{width:"2rem",objectFit:"contain"}}/></Grid>
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
<img src={typeof formData.image =="object"? URL.createObjectURL(formData?.image):formData.image} style={{width:"16rem",objectFit:"contain"}}/>
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
export default EditCommunity;
