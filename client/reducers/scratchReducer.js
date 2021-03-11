//import { types } from "sass";
import * as types from '../constants/actionTypes';

const initialState = {
  user: null,
  giphyVisible: false
};

const scratchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE: {
      // const isAuthenticated = action;
      console.log(action.payload);

      return {
        ...state,
        user: action.payload,
      };
    }
    case types.GIPHY: {
      console.log('GIPHY REDUCER: ', state.giphyVisible);
      return {
        ...state,
        giphyVisible: !state.giphyVisible
      }
    }
    default: {
      return state;
    }
  }
};

export default scratchReducer;
