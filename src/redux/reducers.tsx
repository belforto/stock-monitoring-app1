import { initialState } from "./store";
import {  LOAD_NEWS } from "./actions";



export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWS:
    console.log("action done",action.payload);
      return {
        ...state,
        news: action.payload,
        numberOfCalls:state.numberOfCalls+1
        
      };

    default:
      return state;
  }
};
