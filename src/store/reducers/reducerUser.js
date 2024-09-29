import * as actionType from "../actionsName";

const initialState = {
  user: null,mess: null,users:[]
  
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user};
    case actionType.SET_MESS:
      return{...state,mess:action.mess}
    default:
      return { ...state };
  }
};

export default reducer;