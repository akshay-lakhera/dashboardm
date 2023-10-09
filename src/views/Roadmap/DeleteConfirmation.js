import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

let initialState = {
  name: ""
};
function DeleteRoadmap
({ reloadIt, data, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API_CALL.category.delete(data.data._id);
      if (res.data.success) {
        reloadIt();
        toast.success("Category Deleted");
        handleClose()
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        open={data.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22}>
                Confirmation
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              Please confirm before deleting
            </Grid>

            <Grid item xs={4} textAlign="center">
              <Button
                variant="contain"
                onClick={handleClose}
                className="cus-btn"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4} textAlign="center"></Grid>
            <Grid item xs={4} textAlign="center">
              <Button
                variant="outlined"
                color="error"
                onClick={()=>handleSubmit()}
                // className="cus-btn"
                fullWidth
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const ShowStar = () => <span style={{ color: "red" }}>*</span>;
export default DeleteRoadmap
;
