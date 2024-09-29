import React,{useState} from 'react'
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {useSelector,useDispatch} from 'react-redux'
import Bay from './showListToBay'
import{useNavigate} from 'react-router-dom'
import { editBayByUser } from '../store/actions/actionBay';

const AddToBay = (recipe) => {

const [sending,setSending]=useState(false)
const dispatch=useDispatch()
const schema = yup
.object({
  Name: yup
    .string()
    .required("שדה זה הינו שדה חובה"),
Count:yup
    .number()
    .required("שדה זה הינו שדה חובה -הזן את הכמות הרצויה")
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

const userId=useSelector((state)=>state.user.user.Id)


  const send =(data)=>{

   data.UserId=userId;

   dispatch(editBayByUser(data));  
  }

  


  return (
    <> 
    
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
                <AddShoppingCartIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                הוספת מוצר או אידכון כמות בעגלת הקניות 
              </Typography>
              <br/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Name"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label=" שם המוצר " />
                    )}
                  />
                </Grid>
                <p>{errors.Name?.message}</p>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Count"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="כמות רצויה" />
                    )}
                  />
                </Grid>
                <p>{errors.Count?.message}</p>
               </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
              אידכון כמות / הוספת המוצר
              </Button>
              
            </Box>
          </form>
          
        </Container>
      </ThemeProvider>
      <Bay funShow={sending}/>
    </>
  )
}

export default AddToBay
