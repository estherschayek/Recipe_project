import axios from "axios";
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SearchCategory = ({selectedCategory}) => {
  const [category, setCategory] = useState([]);

 
  useEffect(() => {
    axios
      .get("https://server-recipe-project.onrender.com/api/category")
      .then((x) => {
        setCategory(x.data);
      })
      .catch((err) => console.log(err));
  }, []);


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

       <Grid item xs={12} sm={6} style={{flexBasis:"20%"}}>
       <InputLabel id="demo-simple-select-label">
                          
                          בחר קטגוריה
                        </InputLabel>
       <Select  
       onChange={(event) => selectedCategory(event.target.value)}
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       label="קטגוריה"
       sx={{ width: '150px' }}
       >
       
        {category.map((x) => (
          <MenuItem key={x.Id} value={x.Id}>{x.Name}</MenuItem>
        ))}
        </Select>
        </Grid>
        </Container>
        </ThemeProvider>

    </>
  );
};

export default SearchCategory;
