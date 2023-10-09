// export const dis

import { REDUX_VAR } from "./ReduxVar";

const toggleTheme = (dispatch, value) =>
  dispatch({ type: REDUX_VAR.SHOW_THEME });
const saveMetamaskDetails = (dispatch, payload) =>
  dispatch({ type: REDUX_VAR.METAMASK, payload });

  const saveSession=async()=>{
await sessionStorage.setItem("websiteuser",true)
  }
  const getSession=async()=>{
 return await sessionStorage.getItem("websiteuser")
  }
  const removeSession=async()=>{
 return await sessionStorage.removeItem("websiteuser")
  }
export const ACTIONS = {
  toggleTheme,
  saveMetamaskDetails,
  saveSession,getSession,removeSession
};
