import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { commonReducer } from "./CommonReducer";

const rootReducer = combineReducers({
  AllState: commonReducer,
  
});

export const store = configureStore({
  reducer: rootReducer,
 
});
