import axios from "axios";
import * as actionType from "../actionsName";
import Swal from 'sweetalert2'


export const login = (Username, Password) => {

  return (dispatch) => {
    axios
      .post("https://server-recipe-project.onrender.com/api/user/login", { Username, Password })
      .then((x) => {
        console.log(Username, Password, x);
        dispatch({ type: actionType.SET_USER, user: x.data});
         Swal.fire({
           icon: "succes",
           title:  x.data.Name + "ברוכים הבאים",
           text: "הנך מועבר לעמוד הבית",   
      })
      
    })
      .catch((err) => {
        console.log(Username, Password, err);
        dispatch({ type: actionType.SET_MESS, mess: err.response.data});
         Swal.fire({
           icon: "error",
          title: err.response.data,
           text: "הנך מועבר לרישום",
         });
        
      });
  };
};


