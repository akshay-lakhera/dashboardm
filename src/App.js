import { CssBaseline, ThemeProvider } from "@mui/material";
import { useNavigate, useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import "./styles/global.css";
import "./styles/category.css";
import "react-toastify/dist/ReactToastify.css";

import { baselightTheme } from "./theme/DefaultColors";
import { Provider } from "react-redux";
import { store } from "../src/Redux/Store";
import MetamaskLogin from "./components/metamask/metamasklogin";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { ACTIONS } from "./Redux/Actions";
// dfd
function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const navigate=useNavigate()
  useEffect(() => {
 (async()=>{
 let currSession=await ACTIONS.getSession()
 if(!currSession) navigate("/auth/login")
//  alert(currSession)
 })()
  }, [])
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <MetamaskLogin /> */}
        <CssBaseline />
        {routing}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
