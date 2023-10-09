import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import twitter from "../../assets/images/profile/twitter.png";
import discord from "../../assets/images/profile/discordicon.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import { type } from "@testing-library/user-event/dist/type";
import { MyTheme } from "src/layouts/customTheme";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

function ViewArtist({  handleOpen, reloadIt, open, handleClose, roadmapData }) {
 


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            rowSpacing={2}
            justifyContent="center"
            // alignItems="center"
            spacing={2}

          >
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22} mb={2}>
                Edit Artist
              </Typography>
            </Grid>
            <Grid item xs={5}   borderRight={1} p={2}>
<img src={ roadmapData?.image} style={{width:"100%",objectFit:"contain"}}/>

            </Grid>
            <Grid item xs={7}>
                <Typography fontWeight="bold" fontSize={22}>{roadmapData?.title}</Typography>
                <Typography textAlign="left" color={MyTheme.bgColor1}>{roadmapData?.designation}</Typography>
               <p style={{fontSize:"16px"}}>
                {roadmapData?.description}
               </p>
            </Grid>
{/* 
            <Grid item xs={12} textAlign="center">
              {formData?.image == null ? (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                </Button>
              ) : (
                <div>
                  <div>
                    <img
                      src={
                        typeof formData?.image == "string"
                          ? formData.image
                          : URL.createObjectURL(formData?.image)
                      }
                      style={{ width: "16rem", objectFit: "contain" }}
                    />
                  </div>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Change Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                      }
                    />
                  </Button>
                </div>
              )}
            </Grid> */}

          
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const ShowStar = () => <span style={{ color: "red" }}>*</span>;
export default ViewArtist;
