import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import SignUp from "./singUp";
import AddRecipe from "./addRecipe";
import Home from "./home";
import AddCategory from "./addCategory"
import Search from './search/search'
import ShowSingleRecipe from "./showSingleRecipe";
import MyRecipies from "./myRecipies"
import AddToBay from './bayActions/addToBay'

const Rou = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/singUp" element={<SignUp/>} />

        <Route>
        <Route path="/recipies" element={<Search/>} />
        <Route path="/recipies/:Id" element={<ShowSingleRecipe/>}/>
        <Route path=":userId" element={<MyRecipies/>}/>
        <Route path=":userId/:Id" element={<ShowSingleRecipe/>}/>
        </Route>

        <Route path="/addToBay" element={<AddToBay/>}/>
        <Route path="/addRecipe" element={<AddRecipe/>} />
        <Route path="/home" element={<Home/>} /> 
        <Route path="/addCategory" element={<AddCategory/>}/>
      </Routes>
    </>
  );
};

export default Rou;
