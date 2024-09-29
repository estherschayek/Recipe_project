import * as actionType from "../actionsName";

const initialState = {
  bayUser: [],
};

const reducerBay = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_BAY_BY_USER:
      return { ...state, bayUser: action.bayUser };

    case actionType.DELETE_BAY_BY_USER:{
      const oldList = [...state.bayUser];
      const newList = oldList.filter((bay)=>bay.Id!=action.bayUser.item );
      {console.log("actionDeBay:",action.bayUser.item, "oldList:",oldList,"newList:",newList)}
      return { ...state, bayUser: newList };
      }

    case actionType.EDIT_BAY:{
      const oldList=[...state.bayUser]
      const newList=oldList.map((bay)=>{
        if(bay.Name==action.bayUser.Name){
        return{...bay, Count: bay.Count + action.bayUser.Count}
      } 
      return{...bay}
      })
     
      const found =oldList.some((bay) => bay.Name === action.bayUser.Name);
       
       if (!found) {
        newList.push({
          Id: action.bayUser.item,
          Count: action.bayUser.Count,
          Name:action.bayUser.Name,
        });
      }

      return { ...state, bayUser: newList };
    }
     
    
    default:
      return { ...state };
  }
};

export default reducerBay;