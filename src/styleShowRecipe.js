import React,{Fragment} from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Grid,
  } from "@mui/material";
  import { styled as muiStyled} from "@mui/system";
  import rtlPlugin from 'stylis-plugin-rtl';
  import { prefixer } from 'stylis';
  import { CacheProvider } from '@emotion/react';
  import createCache from '@emotion/cache'; 
  import {styled as scStyled} from 'styled-components';
  import { createTheme, ThemeProvider } from '@mui/material/styles'
  import ButtonGroup from '@mui/material/ButtonGroup';
  import Stack from '@mui/material/Stack';
  import ToDelete from './buttonsIcons/toDelete'
  import ToEditRecipe from './buttonsIcons/toEdit'
  import ToBay from './buttonsIcons/toBay'
  import {useSelector} from "react-redux"
  import RecipeIngridientToAdd from './bayActions/recipeIngredientsToAdd'

  const RecipeCardContainer = scStyled.div`
    border: 2px solid #ce93d8;
    box-shadow: 10px 4px 4px #4a148c;
    border-radius:12px;
    display:flex;
    width:1000px;
    marginRight:auto;
    marginLeft":auto;
    paddingRight:100px;
    justifyContent:center;
  `;
  
  const RecipeCard = muiStyled(Card)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "20px",
    width:"90%",
    marginRight:"auto",
    marginLeft:"auto",
  });
  
  const RecipeImage = muiStyled(CardMedia)({
   width:"300px",
   height:"200px",
    objectFit: "cover",
    position: "relative",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.4s ease-in-out",
    },
    padding:"75px",
    margin:"auto",
    marginTop:"100px"
  });
  
   const Overlay = muiStyled("div")({
       position: 'absolute',
       top: 0,
       left: 0,
       width: '100%',
       height: '100%',
       background: 'purple',
       opacity: 0,
       transition: 'opacity 0.3s ease-in-out',
      display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
      '&:hover': {
         opacity: 0.1,
    },
   });
  
  const OverlayText = muiStyled(Typography)({
    color: "#fff",
    fontSize: "20px",
  });
  
  const theme = createTheme({
    direction: "rtl",
  });
  
  // Create rtl cache
  const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
   

const StyleShowRecipe = (({ref,recipe}) => { 
    
  const currentUser=useSelector((state)=>state.user.user)

  return (
    <>
          <div ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        
        
   <CacheProvider value={cacheRtl}>
    
    
    <ThemeProvider theme={theme}>
      <Box
        dir="rtl"
        display="flex"
        width="90%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
        padding="50px"
        borderRadius="5px"
        
      >
      <Grid container spacing={1}>
        
        <Grid item xs={12} sm={8} md={4} key={recipe.Id}>
        <RecipeCardContainer>
          <RecipeCard key={recipe.Id}>
              <Typography variant="body1" align="center" style={{ fontWeight: 'bold' , paddingTop: '50px', fontSize:'25px', color:'purple' }}>
               {recipe.Name}  
              </Typography>
            <RecipeImage image={recipe.Img} alt={recipe.Name}>
              <Overlay>
                <OverlayText>{recipe.Name}</OverlayText>
              </Overlay>
            </RecipeImage>
            <CardContent>
              <Typography variant="body1" gutterBottom>
               זמן הכנה:{recipe.Duration}  {" "}  דקות
              </Typography>
              <Typography variant="body1">{recipe.Description}</Typography>
              <Typography variant="body1">דרגת קושי:{recipe.Difficulty}</Typography>
             
              <br/>
              <Typography variant="body1" gutterBottom>
                הרכיבים:
              </Typography>
              <RecipeIngridientToAdd ingredients={recipe.Ingrident}/>
            </CardContent>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                הוראות הכנה:
              </Typography>
              <List dense>
                {recipe.Instructions.map((instruction, index) => (
                  <ListItem key={index}>
                    <ListItemText>{instruction}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>

         <ButtonGroup  variant="soft" aria-label="tooltip button group">
            <Stack spacing={2} direction="row">
             
              {currentUser.Id==recipe.UserId?
              <Fragment>
              <ToEditRecipe recipeId={recipe.Id} recipe={recipe}/>
              <ToDelete userId={recipe.UserId} recipeId={recipe.Id} recipeName={recipe.Name}/>
              </Fragment>:<Fragment></Fragment>}
              <ToBay ingredients={recipe.Ingrident} recipeN={recipe.Name}/>
             
              
            </Stack> 
          </ButtonGroup>
        
          </RecipeCard>
          </RecipeCardContainer>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
    </CacheProvider></div> 
    </>
  )
})

export default StyleShowRecipe
