import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Grid, TextField } from "@mui/material";
import { MyTheme } from "src/layouts/customTheme";
import { toast } from "react-toastify";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4
};

export default function DescriptionModal({ open, setOpen }) {
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen({ open: false });
  const copyIt = (field, val) => {
    navigator.clipboard.writeText(val);
    toast.success(field + " copied");
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            color={MyTheme.bgColor1}
          >
            Lead Detail
          </Typography>
          <Grid
            container
            rowSpacing={2}
            mt={3}
            fontWeight="bold"
            fontSize={18}
            alignItems="center"
          >
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative"
                }}
              >
                <Typography fontWeight="bold" fontSize={16}>
                  Full Name
                </Typography>
                <CopyAllIcon
                  style={{
                    position: "absolute",
                    right: 5,
                    zIndex: 10,

                    top: "2.1rem",
                    color: MyTheme.bgColor1,
                    cursor: "pointer"
                  }}
                  fontSize="medium"
                  onClick={() => copyIt("Name", open?.content?.fullName)}
                />
              </div>
              <TextField value={open?.content?.fullName} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative"
                }}
              >
                <Typography fontWeight="bold" fontSize={16}>
                  {open?.content?.platform}
                </Typography>
                <CopyAllIcon
                  style={{
                    position: "absolute",
                    right: 5,
                    zIndex: 10,
                    top: "2.1rem",
                    color: MyTheme.bgColor1,
                    cursor: "pointer"
                  }}
                  fontSize="medium"
                  onClick={() =>
                    copyIt(open?.content?.platform, open?.content?.contact)
                  }
                />
              </div>
              <TextField value={open?.content?.contact} fullWidth />
            </Grid>

            {/* <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  Content Details
                </Grid>
              </Grid>

              <Grid
                container
                fontWeight="400"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                rowSpacing={2}
              >
                <Grid item xs={3}>
                  {open?.content?.platform}
                </Grid>
                <Grid item xs={9} textAlign="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end"
                    }}
                  >
                    {open?.content?.contact ? open?.content?.contact : "NA"}{" "}
                    <CopyAllIcon
                      style={{
                        color: MyTheme.bgColor1,
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        copyIt("Telegram Id", open?.content?.telegram)
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
          <Grid item xs={12} mt={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Typography
                // mt={3}
                alignItems="center"
                fontWeight="bold"
                fontSize={18}
                // bgcolor="	#E5E4E2"
                borderRadius={2}
                color={MyTheme.bgColor1}
                // p={1}
              >
                Message{" "}
              </Typography>
              <CopyAllIcon
                style={{
                  color: MyTheme.bgColor1,
                  cursor: "pointer"
                }}
                onClick={() => copyIt("Name", open?.content?.message)}
              />
            </div>
          </Grid>

          <Typography
            id="modal-modal-description"
            p={1}
            // sx={{ mt: 2 }}
            bgcolor="#F6F6F6"
            borderRadius={2}
            mt={2}
          >
            {open?.content?.message}
          </Typography>
          <Grid container justifyContent="end" mt={3}>
            <Grid item xs={4} textAlign="right">
              {" "}
              <Button variant="outlined" onClick={handleClose} color="error">
                Close
              </Button>{" "}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
