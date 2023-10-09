import React, { useEffect, useRef, useState } from "react";
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
import { MyIcons } from "src/components/MyIcons";

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
content:[]
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
function EditGrill({ handleOpen,data, reloadIt, open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const [allcommunity, setAllCommunity] = useState([])
  const [text, settext] = useState("")


  useEffect(() => {
    (async()=>{
   try {
  console.log(data,"<<<thisis edit")
    setFormData(data)
     
} catch (error) {
 
}
 })()

  }, [])
  

  const handleSubmit = async () => {
    try {
    
      if (formData?.content?.length==0) return toast.error("Please Add Content");
      
    
      const { data } = await API_CALL.grill.update({id:formData._id,...formData});
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        setFormData(initialState);
        handleClose()
        reloadIt()
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
  const onAddcontentOnGrill=()=>{
   
    setFormData({
      ...formData,content:[...formData.content,text]
    })
    settext("")
  }
  const removeItem=(key)=>{
setFormData({...formData,content:formData.content.filter((item,index)=>{
  if(index==key) return false
  else return true
})})
  }
  // console.log(formData,"<<<< this is formdata")
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={2}  justifyContent="center" alignItems="center" spacing={2}>
       
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22}>
                Edit Grill
              </Typography>
            </Grid>
            
            <Grid item xs={10}>
              <TextField
                fullWidth
              name="text"
              value={text}
              onChange={e=>settext(e.target.value)}
                type="string"
                placeholder="Enter  text"
              />
            </Grid>
            <Grid item xs={2} height={"100%"}>
              <Button variant="outlined" style={{height:"100%"}} onClick={onAddcontentOnGrill}> +Add</Button>
            </Grid>
            <Grid item xs={12} md={12} >
              {formData.content.map(((item,key)=>{
                return  <Grid container alignItems="center" key={key}>
                  <Grid item xs={10}>
                <Typography mt={1} textAlign="center" padding={1} borderRadius={2} bgcolor="#efefef">{item}</Typography>
                  
                   </Grid>
                  <Grid item xs={2} textAlign="center">

              <MyIcons.DeleteIcon onClick={()=>removeItem(key)}/>
                   
                   </Grid>
                   </Grid>
              }))}
      
            </Grid>
         \
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
export default EditGrill;
