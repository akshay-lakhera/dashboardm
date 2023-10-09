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
  walletAddress: "",
  fullName: "",
  role: "admin"
};
function AddUsers({ handleOpen, reloadIt, open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let flag = true;
      for (const key in formData) {
        let field = formData[key];
        if (field.trim() == "") flag = false;
      }
      if (!flag) return toast.error("All Fields are required");
      setshowLoader(true);

      const { data } = await API_CALL.users.create(formData);
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
          <Grid container rowSpacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography fontWeight="bold" textAlign="center" fontSize={22}>
                Add User
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="walletAddress"
                onChange={handleChange}
                value={formData?.walletAddress}
                type="string"
                placeholder="Enter Wallet Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="fullName"
                onChange={handleChange}
                value={formData?.fullName}
                type="string"
                placeholder="Enter Full Name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                >
                  {/* <MenuItem value={""}>Select</MenuItem> */}
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  {/* <MenuItem value={"subadmin"}>Sub Admin</MenuItem> */}
                </Select>
              </FormControl>
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
export default AddUsers;
