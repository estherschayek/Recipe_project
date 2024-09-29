import React,{Fragment,useEffect} from 'react'
import{useParams} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { allRecipies } from './store/actions/actionRecipe';
import StyleShowRecipe from './styleShowRecipe'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const MyRecipies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allRecipies());
  }, []);

  const recipies=useSelector((state)=>state.recipe.recipe)
  const {userId}=useParams();
 
  const myRecipe=recipies.filter((x)=>x.UserId==userId)
  
  const theme = createTheme({
    typography: {
      fontFamily: 'Raleway, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Raleway';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
          }
        `,
      },
    },
  });

  return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ fontFamily: 'Raleway', width: '70%', maxWidth: 500 , marginTop: 20,textAlign: "right",color:"purple", marginLeft:"400px"}}>
    
      <Typography variant="h3" gutterBottom>
      !  המתכונים שלי
      </Typography>
   </Box></ThemeProvider>
    {myRecipe?<Fragment>{myRecipe.map((eachRecipe)=>(<StyleShowRecipe recipe={eachRecipe}/>))}</Fragment>:<Fragment>לא רשמת מתכונים</Fragment>}
    
    
      
    </>
  )
}

export default MyRecipies