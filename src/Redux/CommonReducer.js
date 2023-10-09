import { REDUX_VAR } from "./ReduxVar";

const initialState = {
  test: 0,
  showTheme: false,
  metamask: {
    address: null
  }
};

export const commonReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case REDUX_VAR.TEST:
      return {
        ...state,
        test: payload
      };
    case REDUX_VAR.SHOW_THEME:
      return {
        ...state,
        showTheme: !state.showTheme
      };
    case REDUX_VAR.METAMASK:
      return {
        ...state,
        metamask: { ...state.metamask, ...action.payload }
      };

    default:
      return state;
  }
};
