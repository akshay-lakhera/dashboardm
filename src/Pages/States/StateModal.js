import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
let initialState = {
    stateName:"",
    // excel:null
}

export default function StateModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const handleFormData=(e)=>{
    let {name,value}=e.target
    setFormData({[name]:value})
}

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           Enter State Name
          </Typography>
          <br/>
          <TextField  fullWidth id="outlined-basic" label="  " variant="outlined" placeholder='state name'/>
          {/* <br/> */}
          <Box textAlign="center" mt={2}>

   <Button variant="contained"   >Add State</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}