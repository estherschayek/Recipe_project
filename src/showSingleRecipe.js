
import React,{Fragment, useRef,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import{useSelector} from 'react-redux'
import StyleShowRecipe from './styleShowRecipe'
import { useReactToPrint } from "react-to-print";

const ShowSingleRecipe = () => {
const recipies=useSelector((state)=>state.recipe.recipe)
const {Id}=useParams();

console.log(recipies)

const recipe=recipies.find((x)=>x.Id==Id)
const styleShowRecipeRef = useRef("null");



useEffect(() => {
 const handlePrint = () => {
   const printContents = styleShowRecipeRef.current;
   const originalContents = document.body;
   document.body.innerHTML = printContents;
 window.print();
   document.body.innerHTML = originalContents;
   console.log(printContents)
 };
 

 const button=document.getElementById("but")
 button.addEventListener('click',handlePrint)
},[styleShowRecipeRef])

  return (
    <>
    { recipe?<Fragment>
      
      <StyleShowRecipe ref={styleShowRecipeRef} recipe={recipe}/>
      <button id="but">Print</button>
    </Fragment>:<Fragment>
    </Fragment>
    }
      
    </>
  )
}

export default ShowSingleRecipe
