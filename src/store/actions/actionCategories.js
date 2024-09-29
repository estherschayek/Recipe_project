import axios from "axios";
import * as actionType from "../actionsName";



export const allCategories = () => {

  return (dispatch) => { 
    axios
      .get('https://server-recipe-project.onrender.com/api/category')
      .then((x) => { 
        dispatch({ type: actionType.SET_ALL_CATEGORIES, category: x.data})
    })
      .catch((err) => {
        alert("שגיעה בשליפת רשימת הקטגוריות");
      });
  };
};
