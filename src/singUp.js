import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import * as actionType from "./store/actionsName"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Taste and Dream with Esther
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const schema = yup
  .object({
    Username: yup
      .string()
      .required("שדה זה הינו שדה חובה")
      .matches(/^[\w\u0590-\u05FF]{3,15}$/, "שם משתמש 3-15 תווים"),
    Password: yup
      .string()
      .required("שדה זה הינו שדה חובה")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "סיסמה בעלת 8 תווים הכוללת לפחות אות אחת גדולה, אות אחת קטנה וסיפרה"
      ),
    Name: yup.string().required("שדה זה הינו שדה חובה"),
    Phone: yup
      .string()
      .required("שדה זה הינו שדה חובה")
      .matches(/^\d{10}$/, "יש להזין מספר טלפון בעל 10 ספרות"),
    Email: yup
      .string()
      .required("שדה זה הינו שדה חובה")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "כתובת המייל אינה תקינה"
      ),
    Tz: yup
      .string()
      .required("שדה זה הינו שדה חובה")
      .matches(/^\d{9}$/, "מספר תהודת הזהות אינו תקין"),
  })
  .required();

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch=useDispatch()
  dispatch({type:actionType.SET_MESS, mess:null});
  
  const send = (data) => {
    axios
      .post("https://server-recipe-project.onrender.com/api/user/sighin", data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "ברוכים הבאים לאתר שיתוף מתכונים" + response.data.Name + "!",
        });

        navigate("/login");
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
        console.log(err);
        
      });
  };

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
  return (
    <>
      <ThemeProvider theme={theme}>
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                הרשמה
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Username"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="שם משתמש" />
                    )}
                  />
                </Grid>
                <p>{errors.Username?.message}</p>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="Password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label="סיסמה"
                        type="password"
                      />
                    )}
                  />
                </Grid>
                <p>{errors.Password?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Name"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="שם" fullWidth />
                    )}
                  />
                </Grid>
                <p>{errors.Name?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Phone"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="מספר טלפון" fullWidth />
                    )}
                  />
                </Grid>
                <p>{errors.Phone?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="מייל"
                        type="email"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <p>{errors.Email?.message}</p>
                <Grid item xs={12}>
                  <Controller
                    name="Tz"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="מספר תעודת זהות"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <p>{errors.Tz?.message}</p>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                הרשמה
              </Button>
            </Box>
          </form>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
