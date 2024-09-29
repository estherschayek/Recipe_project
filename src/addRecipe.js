import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useSelector,useDispatch} from "react-redux";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import{useNavigate} from 'react-router-dom'
import{useHistory} from 'react-router'
import{allCategories} from './store/actions/actionCategories'
import{addRecipe} from './store/actions/actionRecipe'




function Copyright({ sx }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {"Copyright © "}
      <Link color="inherit" href="">
        רק משתמש רשום יכול להוסיף מתכון
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const schema = yup
  .object({
    Name: yup.string().required("שדה זה הינו שדה חובה"),
    CategoryId: yup.number().integer().required("שדה זה הינו שדה חובה"),
    Img: yup
      .string()
      .matches(/\.(jpeg|jpg|gif|png|webp|png)$/i, "נא לבחור קובץ תמונה מתאים")
      .required("שדה זה הינו שדה חובה"),
    Duration: yup.number().integer().required("שדה זה הינו שדה חובה"),
    Difficulty: yup.number().integer().required("שדה זה הינו שדה חובה"),
    Description: yup.string().required("שדה זה הינו שדה חובה"),
    Instructions: yup.array().required().of(yup.string().required()),
    Ingrident: yup.array()
      .of(
        yup.object().shape({
          Count: yup.number(),
          Name: yup.string(),
          Type: yup.string(),
        })
      )
      .required(),
  })
  .required();




function AddRecipe() {

  const userId = useSelector((state) => state.user.user?.Id);
  const userName = useSelector((state) => state.user.user?.Name);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
   const send = async (data) => { 
     data.UserId = userId;
     console.log(data);
    
     
     try {
      await dispatch(addRecipe(data, userName));
      navigate("/recipies"); // Replace '/recipes' with the actual path of your recipes page
      
    } catch (error) {
      console.log('Failed to add recipe:', error);
      // Handle the error here if needed
    }
     
   }

   

   useEffect(()=>{
     dispatch(allCategories())
   },[ ])

  const categories=useSelector((state)=>state.category.category)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fields: testFields, append: testAppend, remove: testRemove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Instructions", // unique name for your Field Array
  });

  const { fields: xFields, append: xAppend, remove: xRemove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Ingrident", // unique name for your Field Array
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ce93d8",
      },
    },
  });

  console.log(errors);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form onSubmit={handleSubmit(send)}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AutoStoriesTwoToneIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                הוספת מתכון
              </Typography>
             

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Name"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="שם המתכון" />
                    )}
                  />
                </Grid>
                <p>{errors.Name?.message}</p>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="CategoryId"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {" "}
                          קטגוריה
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          label="קטגוריה"
                          {...field}
                        >
                          {categories.map((index) => (
                            <MenuItem value={index.Id} id={1}>
                              {index.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <p>{errors.CategoryId?.message}</p>

                <Grid item xs={12}>
                  <Controller
                    name="Img"
                    control={control}
                    render={({field})=> (
                         <TextField
                          {...field}
                          type="text"
                          label="הכנס כתובת URL של תמונה מתאימה"
                          fullWidth
                          style={{ paddingRight: "58px" }}/>
                      
                    )}
                  />
                </Grid>
                <p>{errors.Img?.message}</p>

                <Grid item xs={12}>
                  <Controller
                    name="Duration"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="זמן הכנה בדקות " fullWidth />
                    )}
                  />
                </Grid>
                <p>{errors.Duration?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Difficulty"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          דרגת קושי
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="דרגת קושי"
                          {...field}
                        >
                          <MenuItem value={1}>קלה</MenuItem>
                          <MenuItem value={2}>בינונית</MenuItem>
                          <MenuItem value={3}>קשה</MenuItem>
                          <MenuItem value={4}>מורכבת</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <p>{errors.Difficulty?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="תיאור קצר על המרשם"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <p>{errors.Description?.message}</p>

                 {/* //רכיבים */}
                 <Grid item xs={12}>
                    <br />
                    <div>רכיבים</div>
                    <Typography component="h4" variant="h5">
                במידה וישנו שדה שאינך רוצה למלאות רשום "/" כדי לעבור בתקני המתכון
              </Typography>

                    {xFields.map((field, index) => (

                      <Grid item xs={12}>
                        <Controller
                          name={`Ingrident.${index}.Count`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="הכמות במספר"
                            />
                          )}
                        />
                        <Controller
                          name={`Ingrident.${index}.Name`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="שם מוצר"
                            />
                          )}
                        />
                        <Controller
                          name={`Ingrident.${index}.Type`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="סוג הכמות"
                            />
                          )}
                        />
                        <Button onClick={() => xRemove('')}>הסר חומר זה</Button>
                        <p>{errors.Ingrident?.message}</p>
                      </Grid>

                    ))}
                  </Grid>

                  <Button onClick={() => xAppend('')}>הוסף חומר נוסף</Button>

                  {/* //הוראות הכנה */}
                  <Grid item xs={12}>
                    <br />
                    <div>הוראות הכנה</div>

                    {testFields.map((field, index) => (

                      <Grid item xs={12}>
                        <Controller
                          name={`Instructions.${index}`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                            />
                          )}
                        />
                        <Button onClick={() => testRemove('')}>הסר הוראה  </Button>
                        <p>{errors.Instructions?.message}</p>
                      </Grid>

                    ))}
                  </Grid>

                  <Button onClick={() => testAppend('')}>הוסף הוראה </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                >
                  הוספה
                </Button>
              </Grid>
            </Box>
          </form>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddRecipe;
