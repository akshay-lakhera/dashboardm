import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import logo from "../../../../assets/images/logos/footerskydog.png";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block"
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      style={{ textAlign: "center", width: "100%", height: "100%" }}
    >
      {/* <LogoDark height={70} /> */}
      <img src={logo} style={{ width: "80%", objectFit: "contain" }} />
    </LinkStyled>
  );
};

export default Logo;
