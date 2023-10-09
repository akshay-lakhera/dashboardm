import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { API_CALL } from 'src/services/APICalls';
import { toast } from 'react-toastify';
import { Box, Grid, Switch } from '@mui/material';
import { showDate } from '../commonfunctions';
import EditRoadmap from 'src/views/Roadmap/EditRoadmap';
import { useNavigate } from 'react-router';
export default function NftCard({item,reloadIt,setEditModal}) {
  const navigate=useNavigate()
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const showToggle=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInEcosystem:!item.showInEcosystem},item._id)
            if(data.success) {
                item.showInEcosystem ?
                toast.success("NFT Disabled"):toast.success("Nft Enabled")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.collection.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while Deleting NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}

        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray">
          {item?.category?.name} 
        </Typography>
        </div>
      </CardContent>
      <Box>
        <Grid container alignItems="center">
          {/* <Grid item xs={5} textAlign="left">
Slider
      <Switch defaultChecked={item?.showInHomeSlider} onClick={()=>{
        manageBanner()
      }}/>
          </Grid> */}
          {/* <Grid item xs={5} textAlign="left">
Ecosystem
      <Switch defaultChecked={item?.showInEcosystem} onClick={e=>{
        console.log(e.target.value)
        
        showToggle()
      }}/>
          </Grid> */}
          <Grid item xs={10} textAlign="right">
    <Button size="small" color="primary" onClick={()=>{
navigate("/edit-gallery/"+item._id)
    }} > Edit
    </Button>
          </Grid>
          <Grid item xs={2} textAlign="right">
    <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
          </Grid>
        </Grid>
      </Box>
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
   
      <div>

      </div>
    

    </Card>
  );
}
export  const CommunityCard=({item,reloadIt,setEditModal})=> {
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.Community.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}

        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray">
          {item?.category?.name} 
        </Typography>
        </div>
      </CardContent>
      <CardActions>
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
        <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
        <Button size="small" color="primary" onClick={()=>setEditModal({open:true,data:item})}> Edit</Button>
      </CardActions>
    </Card>
  );
}
export  const PartnerCard=({item,reloadIt,setEditModal})=> {
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.Partner.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}

        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray">
          {item?.category} 
        </Typography>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>

   
        <Typography gutterBottom variant="h5" component="div" color="gray">
          #{item?.nilValue} 
        </Typography>
        </div>
      </CardContent>
      <CardActions style={{padding:"0", textAlign:"right"}}>
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
        <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
        <Button size="small" color="primary" onClick={()=>setEditModal({open:true,data:item})}> Edit</Button>
      </CardActions>
    </Card>
  );
}
export  const SliderCard=({item,reloadIt,clickEdit})=> {
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.Slider.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}

        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray">
          {item?.category} 
        </Typography>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>

   
        {/* <Typography gutterBottom variant="h5" component="div" color="gray">
          #{item?.nilValue} 
        </Typography> */}
        </div>
      </CardContent>
      <CardActions style={{padding:"0", textAlign:"right"}}>
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
        <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
        <Button size="small" color="primary" onClick={clickEdit}> Edit</Button>
      </CardActions>
    </Card>
  );
}
export  const RoadmapCard=({item,onclickEdit,reloadIt})=> {
  const [openEditModal, setopenEditModal] = React.useState({show:false,data:{}})
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.Roadmap.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}

        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray" fontSize={13}>
          {showDate(item?.date)} 
        </Typography>
        </div>
     
      </CardContent>
      <CardActions style={{padding:"0", textAlign:"right"}}>
        {/* <EditRoadmap open={openED} /> */}
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
        <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
        <Button size="small" color="primary" onClick={()=>onclickEdit(item)}> Edit</Button>
      </CardActions>
    </Card>
  );
}
export  const ArtistCard=({openViewModal,item,onclickEdit,reloadIt})=> {
  const [openEditModal, setopenEditModal] = React.useState({show:false,data:{}})
    const manageBanner=async()=>{
        try {
            const {data} =await API_CALL.collection.update({showInHomeSlider:!item.showInHomeSlider},item._id)
            if(data.success) {
                item.showInHomeSlider ?
                toast.success("NFT has been removed from Slider"):toast.success("Nft has been added to Slider")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while updating NFT")
        }
    }
    const deleteCard=async()=>{
        try {
            const {data} =await API_CALL.Artist.delete(item._id)
            if(data.success) {
              
                toast.success("NFT successfully Deleted")
                reloadIt()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while Deleting NFT")
        }
    }
  return (
    <Card sx={{ maxWidth: 305,p:"10px",borderRadius:"10px" }} style={{border:"1px solid #ececec"}}>
      <CardMedia
        sx={{ height: 276,borderRadius:"10px" }}
        image={item.image}
onClick={()=>openViewModal(item)}
        title="green iguana"
      />
      <CardContent style={{padding:"5px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>

        <Typography gutterBottom variant="h5" component="div">
          {item.title} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="gray" fontSize={13}>
          {showDate(item?.date)} 
        </Typography>
        </div>
     
      </CardContent>
      <CardActions style={{padding:"0", textAlign:"right"}}>
        {/* <EditRoadmap open={openED} /> */}
      {/* <CollectionsBookmarkIcon  color={item?.showInHomeSlider?"primary":""} style={{cursor:"pointer"}} onClick={manageBanner} /> */}
        <Button size="small" color="error" onClick={deleteCard}> Delete</Button>
        <Button size="small" color="primary" onClick={()=>onclickEdit(item)}> Edit</Button>
      </CardActions>
    </Card>
  );
}