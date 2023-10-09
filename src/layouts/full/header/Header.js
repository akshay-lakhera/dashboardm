import React, { useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { ACTIONS } from "src/Redux/Actions";
import MetamaskLogin from "src/components/metamask/metamasklogin";
import { useNavigate } from "react-router";

const Header = (props) => {
  const dispatch = useDispatch();
  const changeTheme = () => ACTIONS.toggleTheme(dispatch);
  const navigate=useNavigate()
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  useEffect(() => {
    (async()=>{
      let check=await ACTIONS.getSession()
      if(!check) navigate("/auth/login")
    })()
  }, [])
  

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    // background: "black",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px"
    }
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary
  }));

  return (
    <AppBarStyled position="sticky" color="default" style={{
      // background:"black"
    }}>
      {/*  Metamask */}

      {/* <MetamaskLogin /> */}

      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline"
            }
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main"
            })
          }}
        >
          {/* <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge> */}
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Button variant="contained" color="primary" onClick={changeTheme}>
            Switch theme
          </Button> */}
          {/* <Button className="coltheme2 bold fs16">Log out</Button> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object
};

export default Header;
