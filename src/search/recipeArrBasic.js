import React,{Fragment} from 'react'
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
} from "@mui/material";
import { styled as muiStyled } from "@mui/system";
import { styled as scStyled } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {Link,Outlet} from 'react-router-dom'
import CakeIcon from '@mui/icons-material/Cake';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import{useSelector} from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';

const RecipeCardContainer = scStyled.div`
border: 2px solid #ce93d8;
box-shadow: 10px 4px 4px #4a148c;
border-radius:12px;
flexBasis:20%;
flexDirection:row wrap;
justifyContent:center;
`;

const RecipeCard = muiStyled(Card)({
display: "flex",
flexDirection: "row",
justifyContent: "center",
marginBottom: "20px",
flexBasis:"45%",
});

const RecipeImage = muiStyled(CardMedia)({
width:"400px",
objectFit: "cover",
position: "relative",
"&:hover": {
  transform: "scale(1.1)",
  transition: "transform 0.4s ease-in-out",
},
padding:"100px",
});


const Overlay = muiStyled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    opacity: 1,
  },
});

const OverlayText = muiStyled(Typography)({
  color: "#fff",
  fontSize: "20px",
});

const theme = createTheme({
  direction: "rtl",
});





const RecipeArrBasic = ({ recipe }) => {
  const userId=useSelector((state)=>state.user.user?.Id)

  return (
    <>
      <ThemeProvider theme={theme}>
      <Box
            dir="rtl"
            display="flex"
            width="100%"
            flexWrap="wrap"
            justifyContent="center"
            marginTop="20px"
            padding="20px"
            borderRadius="5px"
            
          >
      <Grid>
        {recipe.map((item) => (
         
         <div style={{ flexBasis: "25%"}}>
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <RecipeCardContainer>
              <RecipeCard key={item.Id}>
                
                <RecipeImage image={item.Img} alt={item.Name}>
                  <Overlay>
                    <OverlayText>{item.Name}</OverlayText>
                  </Overlay>
                </RecipeImage>
             <CardContent>
             <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
                }}
             >
              <ButtonGroup
                 orientation="vertical"
                 aria-label="vertical contained button group"
                 variant="text"
                 size="small" 
                >
              <Tooltip arrow title="לפרטי המתכון">
                  <Button style={{padding:"10px"}}>
                    <Link key={item.Ingridentd} to={`${item.Id}`}style={{texteDecoration:"none"}}>
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <CakeIcon/>
                      </Avatar>
                   </Link>
                   <Outlet/>
                  </Button>
              </Tooltip>
            {userId==item.UserId?<Fragment>
              <Tooltip arrow title="מרשם בבעלותך ">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon/>
              </Avatar>
              </Tooltip>
            </Fragment>:null} 
            </ButtonGroup>
            </Box>
            </CardContent>
              </RecipeCard>
            </RecipeCardContainer><br/>
          </Grid></div>
        ))} 
      </Grid>
       </Box> 
      </ThemeProvider>

    </>
  )
}

export default RecipeArrBasic
