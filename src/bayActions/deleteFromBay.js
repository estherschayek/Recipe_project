import React,{useState,useEffect} from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import {useSelector,useDispatch} from 'react-redux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { deleteBayByUser } from '../store/actions/actionBay';


const DeleteFromBay = (item,itemName) => {

 const dispatch=useDispatch()

 const Delete=(item)=>{

       dispatch(deleteBayByUser(item,itemName));  

       console.log("the item:" ,item)

 }

  return (
    <>
      <Tooltip arrow title="מחיקת מוצר">
        <Button onClick={() => Delete(item)}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <RemoveShoppingCartIcon/>
        </Avatar></Button></Tooltip>
    </>
  )
}

export default DeleteFromBay
