import axios from "axios";
import * as actionType from "../actionsName";
import Swal from 'sweetalert2'


export const AllBayByUser = (userId) => {

  return (dispatch) => { 
    
    axios
      .get(`https://server-recipe-project.onrender.com/api/bay/${userId}`)
      .then((x) => { 
        dispatch({ type: actionType.SET_BAY_BY_USER, bayUser: x.data})
        
    })
      .catch((err) => {
       console.log(err.Data) ;
      });
  };
};

export const deleteBayByUser = (item,itemName) => {

return (dispatch) => { 
  console.log("theDataSendToDEleteFromBay",item)
  axios
    .post(`https://server-recipe-project.onrender.com/api/bay/delete/${item}`)

    .then((x) => { 
      console.log("result",x)
      dispatch({ type: actionType.DELETE_BAY_BY_USER, bayUser:item})
     
      Swal.fire({
                 icon: "success",
                title:    "מוצר"+" " + item.itemName,
                text:"נמחק בהצלחה"
                
            })
  })
    .catch((err) => {
     console.log("err",err) ;
    });
};
};

export const editBayByUser = (data) => {

  return (dispatch) => { 
    console.log("theDataSendToAddOrEditTheBay",data)
    axios
    .post(`https://server-recipe-project.onrender.com/api/bay`,data)
      .then((x) => { 
        console.log("result",x)
        dispatch({ type: actionType.EDIT_BAY, bayUser:data})
       
        Swal.fire({
          icon: "success",
          title:    "מוצר"+" " + x.data.Name +" "+ "נקלט בהצלחה",
          text: "יש כרגע ממוצר זה" +" " +x.data.Count+" "+" פריטים"   
       })
    })
      .catch((err) => {
        console.log(err.response.data)
        Swal.fire({
        icon: "error",
        title:  err.response.data, 
        })
      });
  };
  };

