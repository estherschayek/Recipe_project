import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useDispatch,useSelector} from 'react-redux'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {allCategories} from './store/actions/actionCategories'



const AddCategory = () => {
    const schema = yup
  .object({
    Name: yup
      .string()
      .required("שדה זה הינו שדה חובה")
  })
  .required();


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ce93d8',
      },
    },
  });

  
  console.log(errors);

    const send =(data)=>{
        axios
        .post('http://localhost:8080/api/category',data)
        .then((x)=>
        Swal.fire({
            icon: "success",
            title:    "קטגוריה"+" " + x.data.Name,
            text:"נקלטה בהצלחה"
             
       }))
       .catch((err)=>{
           console.log(err.response.data)
       Swal.fire({
        icon: "error",
        title:  err.response.data,
        
       })
    })

    }

    const dispatch=useDispatch();
   

    useEffect(()=>{
      dispatch(allCategories())
    },[send])

   const categories=useSelector((state)=>state.category.category)

  return (
       <>
       <div style={{display:"flex", justifyContent:"center", width:"90%"}}>
       
      <ThemeProvider theme={theme} style={{flexBasis:"40%"}}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form  onSubmit={handleSubmit(send)}>
            <Box
             
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AppRegistrationIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                הוספת קטגוריה
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Name"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="הוסף קטגוריה " />
                    )}
                  />
                </Grid>
                <p>{errors.Name?.message}</p>
               </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                הוסף
              </Button>
              
            </Box>
          </form>
          
        </Container>
      </ThemeProvider>
      <div style={{ flexBasis: "37%", marginRight: "100px"}}>
       <Typography variant="h6" gutterBottom>
        רשימת הקטגוריות הקימות
        </Typography>
        {
            categories.map((index)=>(
                <>
                <Typography variant="body1" key={index.Id}>
                {index.Name}
                </Typography>
               <br/>
               </> 
            )
            
            )
        }
       </div>
      </div>
    </>
    

  )
}

export default AddCategory




   
 


