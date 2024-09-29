import React,{useState,useEffect} from 'react'
import axios from 'axios'
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import {useSelector,useDispatch} from 'react-redux'
import { removeRecipe } from '../store/actions/actionRecipe';
import {useNavigate} from 'react-router-dom'



const ToDelete = ({userId,recipeId,recipeName}) => {

   const[newArrayRecipe,setNewArrayRecipe]=useState([]);
   const currentUserId=useSelector((state)=>state.user.user)
   const recipies=useSelector((state)=>state.recipe.recipe)
   
   const dispatch=useDispatch();
   const navigate=useNavigate();

   const Delete=(recipeId)=>{
   // console.log("currentUser",currentUserId.Id,"userRecipeId",userId)
     
   // console.log("the data:",recipeId)

   //        axios
   //   .post(`http://localhost:8080/api/recipe/delete/${recipeId}`)
   //    .then((response)=>{
       
       
       dispatch(removeRecipe(recipeId,recipeName))
      
       navigate('/recipies')
      //   console.log("theresponse",response.data)
      //    Swal.fire({
      //       icon: "success",
      //       title: recipeName,
      //        text:"נמחקה בהצלחה"
             
      //   })

      //  setNewArrayRecipe(recipies.filter((x) => (x.Id!=recipeId)));
      //  console.log("the old array:", recipies,"the new array after delete:",newArrayRecipe)
      
      // })
      // .catch((err)=>{
      //    console.log("error!",err.Data.message)
      // }) 
   } 
   
  

    
   
   
  return (
    <>
         <Tooltip arrow title="מחק את המתכון אם אתה רשמת אותו">
            <Button onClick={() => Delete(recipeId)}> 
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FolderDeleteIcon/>
            </Avatar>מחיקה
            </Button>
          </Tooltip>
    </>
  )
  }

export default ToDelete






