import React,{Fragment,useState} from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';

import {useNavigate} from 'react-router-dom'


const ToBay = ({ingredients,recipeN}) => {
  const navigate=useNavigate()
  const[isClicked,setIsClicked]=useState(false)
 

const GoToBay=()=>{
 setIsClicked(true)

}

  return (
    <>
      <Tooltip arrow title="לרשימת הקניות שלי">
            <Button onClick={()=>GoToBay()}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ListIcon/>
            </Avatar>קניות
            </Button>
            {isClicked?<Fragment>
    
              {navigate('/addToBay')} 
              
            </Fragment>:null}
      </Tooltip>
    </>
  )
}

export default ToBay
