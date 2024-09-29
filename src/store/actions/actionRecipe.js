import axios from "axios";
import * as actionType from "../actionsName";
import Swal from 'sweetalert2'



export const allRecipies = () => {

  return (dispatch) => { 
    axios
      .get("https://server-recipe-project.onrender.com/recipe")
      .then((x) => { 
        dispatch({ type: actionType.SET_ALL_RECIPE, recipe: x.data})
    })
      .catch((err) => {
        alert("שגיעה בשליפת רשימת המתכונים");
      });
  };
};

export const removeRecipe=(recipeId,recipeName)=>{
  return(dispatch)=>{
    axios
    .post(`https://server-recipe-project.onrender.com/recipe/delete/:Id`,{recipeId})
    .then((x)=>{
      console.log("x",x)
      dispatch({type:actionType.DELETE_RECIPE,recipe:recipeId})
      Swal.fire({
          icon: "success",
          title:recipeName,
          text:"נמחקה בהצלחה"
                  
         })
    })
    .catch((err)=>
    alert(err.Data.message))
  }
}


export const addRecipe=(data, userName)=>{

  
  return(dispatch)=>{
    
    axios
    .post("https://server-recipe-project.onrender.com/recipe", data)
    .then((x)=>{
      console.log("x",x.data)
      dispatch({type:actionType.ADD_RECIPE, recipe:data})
      Swal.fire({
        icon: "sucess",
        title: "המתכון נשמר בהצלחה" +" " +userName,
      });
    
    })
    .catch((err)=>
    Swal.fire({
      icon: "error",
      title: err,
    }))
  }
}



