import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import EditNoteIcon from '@mui/icons-material/EditNote';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tooltip from '@mui/material/Tooltip';
import { useSelector,useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom"
import {allCategories} from '../store/actions/actionCategories'


const schema = yup
  .object({
    Name: yup.string().required(),
    CategoryId: yup.number().integer().required(),
    Img: yup
      .string()
      .matches(/\.(jpeg|jpg|gif|png|webp|png)$/i, "נא לבחור קובץ תמונה מתאים")
      .required(),
    Duration: yup.number().integer().required(),
    Difficulty: yup.number().integer().required(),
    Description: yup.string().required(),
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



const ToEditRecipe = ({ recipeId, recipe }) => {

  const [allowed, setAllowed] = useState(false);
  const currentUserId = useSelector((state) => state.user.user)
  const currentUserName=useSelector((state) => state.user.user.Name)

  const navigate = useNavigate();

  console.log("instructions old recipe:", recipe.Instructions)
  console.log("ingredients old recipe:", recipe.Ingrident)


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setAllowed(true)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const Edit = (data) => {
    data.UserId = currentUserId.Id;
    data.Id = recipeId;
    

    console.log("the data is:", data)
    console.log("recipeId:", recipeId, "dataId:", data.Id)
    axios
      .post(`https://server-recipe-project.onrender.com/api/recipe/edit`, data)
      .then((response) => {
        console.log(response.data)
       
        Swal.fire({
          icon: "success",
          title: currentUserName +" ",
          text: "העריכה בוצעה בהצלחה"

        })
        handleClose();
        navigate("/recipies")
      })
      .catch((err) => {
        console.log("error!", err.response.data)
      })
  }



  const dispatch=useDispatch();
   

  useEffect(()=>{
    dispatch(allCategories())
  },[ ])

 const categories=useSelector((state)=>state.category.category)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: recipe });

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


  return (
    <>
      <Tooltip arrow title="ערוך את המתכון אם אתה רשמת אותו">
        <Button onClick={handleOpen}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditNoteIcon />
          </Avatar>עריכה
        </Button>
      </Tooltip>
      {allowed ? <Fragment>

        <ThemeProvider theme={theme}>  <Modal open={open} onClose={handleClose}>

          <Container component="main" maxWidth="sm" margin="10%" style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
            <CssBaseline />
            <form onSubmit={handleSubmit(Edit)}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "pink",

                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <EditNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  עריכת מתכון
                </Typography>

                <Grid container spacing={2} style={{ padding: "100px" }}>
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
                              <MenuItem value={index.Id} id={index.Id}>
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
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="הכנס כתובת URL של תמונה מתאימה"
                          fullWidth
                          style={{ paddingRight: "58px" }} />

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
                            value={field.value}
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
                    <div>רכיבים </div>

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
                    עריכה
                  </Button>
                </Grid>
              </Box>
            </form>
          </Container></Modal>
        </ThemeProvider></Fragment> : <Fragment></Fragment>}
    </>
  )
}

export default ToEditRecipe
