import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { login } from "./store/actions/actionUser";

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


const Login = () => {
  const [Username, seUserName] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();

  const send = () => {
   
    dispatch(login(Username, Password));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ce93d8',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
              כניסה
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={Username}
                label="שם משתמש"
                name={Username}
                autoComplete={Username}
                autoFocus
                onChange={(event) => seUserName(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={Password}
                label="סיסמה"
                type={Password}
                id={Password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="זכור אותי!"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={send}
                color="primary"
              >
                כניסה
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/singUp" variant="body2">
                    {"אין לך חשבון? הרשם עכשיו"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
