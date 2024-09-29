
import React  from 'react';

import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SearchDifficulty = ({setSelectedDifficulty}) => {
  const difficultiesGrade=[1,2,3,4];
  
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
                          
                          בחר דרגת קושי
                        </InputLabel>
       <Select  
       onChange={(event) => setSelectedDifficulty(event.target.value)}
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       label="דרגת קושי"
       sx={{ width: '150px' }}
       >
       
        {difficultiesGrade.map((x) => (
          <MenuItem key={x} value={x}>{x}</MenuItem>
        ))}
        </Select>
        </Grid>
        </Container>
        </ThemeProvider>

    </>
  );
};

export default SearchDifficulty;