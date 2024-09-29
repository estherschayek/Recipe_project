import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink,Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import myLogo from './pictures/logoProjectReact.jpg'


const Header = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ bgcolor: "#f3e5f5", boxShadow: " 5px 5px 5px #4a148c", zIndex:"999" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div><img src={myLogo} alt="logo" style={{width:"175px", bordeRadius:"10%"}}/></div>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{color:"#6a1b9a"}}> שלום {user?.Name}</div>
          </Typography>
          {!user ? (
            <Fragment>
            <Button color="primary"><NavLink to={"/singUp"} style={{ textDecoration: "none", color: "#6a1b9a" }}>הרשמה</NavLink></Button>
            <Button color="primary"><NavLink to={"/login"} style={{ textDecoration: "none", color: "#6a1b9a" }}>כניסה</NavLink></Button>
            </Fragment>
            ):(
            <Fragment>
            <Button color="primary"><NavLink to={"/login"} style={{ textDecoration: "none", color: "#6a1b9a" }}>החלף משתמש</NavLink></Button>
            <Button color="primary"><NavLink to={"/addCategory"} style={{ textDecoration: "none", color: "#6a1b9a" }}>הוספת קטגוריה</NavLink></Button> 
            <Button color="primary"><NavLink to={"/addRecipe"} style={{ textDecoration: "none", color: "#6a1b9a" }}>הוספת מתכון</NavLink></Button>
            <Button color="primary"><NavLink to={"/recipies"} style={{ textDecoration: "none", color: "#6a1b9a" }}>מתכונים</NavLink></Button>
            <Button color="primary"><NavLink key={user.Id} to={`${user.Id}`} style={{ textDecoration: "none", color: "#6a1b9a" }}>המתכונים שלי</NavLink></Button>
            <Button color="primary"><NavLink to={"/home"} style={{ textDecoration: "none", color: "#6a1b9a" }}>דף הבית</NavLink></Button> 
            <Outlet/>
            </Fragment>
            )}
          
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>

    </>
  );
};

export default Header;
