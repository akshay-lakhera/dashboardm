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
function EditSlider({ handleOpen, reloadIt, data,open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const [allcommunity, setAllCommunity] = useState([])
  // const [first, setfirst] = useState(second)
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    (async()=>{
   try {
setFormData(data)

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
      if (!formData?.title) return toast.error("Title is required");
      if (!formData?.nilValue) return toast.error("Nil Value is required");
      if (!formData?.url) return toast.error("URL is required");
      if (!formData.image) return toast.error("Image is required");
      if (!formData.category) return toast.error("Category is required");
      setshowLoader(true)
      let payload =new FormData()
      payload.append("title",formData?.title)
      payload.append("nilValue",formData?.nilValue)
      payload.append("url",formData?.url)
      payload.append("category",formData?.category)
      if(typeof formData.image =="object"){

        payload.append("image",formData?.image,formData?.image.name)
      }

      const { data } = await API_CALL.Slider.update(payload,formData._id
        );
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        setFormData(initialState);
         reloadIt()
  handleClose()
        // reloadIt();
      } else {
        setshowLoader(false);
        toast.error(data.message);
      }
      console.log(data, "<<thisis data");
    } catch (error) {
      console.log(error);
      toast.error("Error while updating, Please try again after some time");
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
                Edit Slider
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                onChange={handleChange}
                value={formData?.title}
                type="string"
                placeholder="Enter Title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="url"
                onChange={handleChange}
                value={formData?.url}
                type="string"
                placeholder="Enter URL "
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="nilValue"

                onChange={handleChange}
                value={formData?.nilValue}
                type="number"
                placeholder="Enter NIL Value"
              />
            </Grid>
           
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="category"

                onChange={handleChange}
                value={formData?.category}
                type="string"
                placeholder="Enter Category Value"
              />
            </Grid>
           
        
          
    
            
                 <Grid item xs={12} textAlign="center">
            {formData?.image == null ? <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file"  onChange={e=>setFormData({...formData,image:e.target.files[0]})}/>
</Button>:<div>
<div>

<img src={typeof formData.image=="string"?formData.image :URL.createObjectURL(formData?.image)} style={{width:"16rem",objectFit:"contain"}}/>
</div>

<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Change Image
  <VisuallyHiddenInput type="file"  onChange={e=>setFormData({...formData,image:e.target.files[0]})}/>
</Button>
</div>
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
export default EditSlider;
