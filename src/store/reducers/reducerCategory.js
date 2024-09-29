import * as actionType from "../actionsName";

const initialState = {
  category: [],
};

const reducerCategory = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ALL_CATEGORIES:
      return { ...state, category: action.category };
    default:
      return { ...state }
  }
};

export default reducerCategory;