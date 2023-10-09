import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography, Button, TextField } from "@mui/material";
// components
import PageContainer from "src/components/container/PageContainer";
import Logo from "src/layouts/full/shared/logo/Logo";
import { useDispatch } from "react-redux";
import { ACTIONS } from "src/Redux/Actions";
import MetamaskLogin from "src/components/metamask/metamasklogin";
import { API_CALL } from "src/services/APICalls";
import { toast } from "react-toastify";
import CustomLoader from "src/components/custom-scroll/CustomLoader";

// const Login2 = () => {
//   return (
//     <PageContainer title="Login" description="this is Login page">
//       <Box
//         sx={{
//           position: "relative",
//           "&:before": {
//             content: '""',
//             background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
//             backgroundSize: "400% 400%",
//             animation: "gradient 15s ease infinite",
//             position: "absolute",
//             height: "100%",
//             width: "100%",
//             opacity: "0.3"
//           }
//         }}
//       >
//         <Grid
//           container
//           spacing={0}
//           justifyContent="center"
//           sx={{ height: "100vh" }}
//         >
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             lg={4}
//             xl={3}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Card
//               elevation={9}
//               sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
//             >
//               <Box display="flex" alignItems="center" justifyContent="center">
//                 <Logo />
//               </Box>
//               <AuthLogin
//                 subtext={
//                   <Typography
//                     variant="subtitle1"
//                     textAlign="center"
//                     color="textSecondary"
//                     mb={1}
//                   >
//                     Your Social Campaigns
//                   </Typography>
//                 }
//                 subtitle={
//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     justifyContent="center"
//                     mt={3}
//                   >
//                     <Typography
//                       color="textSecondary"
//                       variant="h6"
//                       fontWeight="500"
//                     >
//                       New to Modernize?
//                     </Typography>
//                     <Typography
//                       component={Link}
//                       to="/auth/register"
//                       fontWeight="500"
//                       sx={{
//                         textDecoration: "none",
//                         color: "primary.main"
//                       }}
//                     >
//                       Create an account
//                     </Typography>
//                   </Stack>
//                 }
//               />
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </PageContainer>
//   );
// };

const Login2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formData, setformData] = useState({email:"",password:""})
  useEffect(() => {
    
(async ()=>{
  let check=await ACTIONS.getSession()
  if(check) navigate("/")
})()
  }, [])
  
  const showPopup = async () => {
    setLoader(true);
    try {
      if(!formData.email || !formData.password)  {
          setLoader(false);
      return  toast.error("Email / Password are required")
      }else{
        const {data}=await API_CALL.users.get(formData)
        if(data.success){
          toast.success("Logged In")
          await ACTIONS.saveSession()
          navigate("/")
          setLoader(false);
        }else{
          toast.error("Invalid Email / Password")
          setLoader(false);
        }
      }
    } catch (error) {
     console.log(error) 
     toast.error("Invalid Email / Password")
          setLoader(false);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      {/* <MetamaskLogin /> */}
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background:"#121212",
            // background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            // opacity: "0.3"
          }
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px",background:"#000" }}
              className="boxshadow"
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Grid container rowGap={2} justifyContent="center" columnGap={3}>
                {/* <Grid item xs={12} textAlign="center" mt={2}>
                  <img src={metamask} width="100px" />
                </Grid> */}
                <Grid item xs={12} mt={2}>
                 
                  <input placeholder="Email" onChange={e=>setformData({...formData,email:e.target.value})}  value={formData?.email} className="inputlogin" style={{color:"white !important"}}/>
                </Grid>
                <Grid item xs={12}>
                  <input placeholder="Password" type="password" onChange={e=>setformData({...formData,password:e.target.value})} className="inputlogin" value={formData?.password}/>
                </Grid>
                <Grid item xs={10} textAlign="center" mt={3}>
                  {loader ? (
                    <CustomLoader />
                  ) : (
                    <Button
                      variant="contained"
                      className="align-center metamask"
                      fullWidth
                      onClick={showPopup}
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px"
                      }}
                    >
                     Login
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
