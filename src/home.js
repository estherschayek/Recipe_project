import React,{useState,useEffect, useCallback, useMemo,Fragment} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import{useSelector} from 'react-redux'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

import one from './pictures/enter1.jpg'
import two from './pictures/enter2.jpg'
import three from './pictures/enter3.jpg'
import four from './pictures/enter4.jpg'
import five from './pictures/enter5.jpg'
import six from './pictures/enter6.jpg'
import seven from './pictures/enter7.jpg'
import eight from './pictures/enter8.jpg'
import logo from './pictures/logoProjectReact.jpg'


const Home = () => {

  const user=useSelector((state)=>state.user.user)
  const pictures=useMemo(()=>[logo,one,two,three,logo,four,five,six,seven,logo,eight],[])
  const[currentPictIndex,setCurrentPictIndex]=useState(0)

  const updateIndex=useCallback(()=>{
      
    setCurrentPictIndex((prevIndex)=>
    prevIndex===pictures.length-1?0:prevIndex+1)
  
  },[pictures])
 

  
  useEffect(()=>{
    const interval=setInterval(updateIndex,2000);

    return () =>clearInterval(interval)
  },[updateIndex])

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
    <div>
      <img src={pictures[currentPictIndex]} alt="picturesHomeSlideshow" style={({width:"100%",maxWidth:"100%",height:"auto", maxHeight:"calc(65vh)", objetFit:"cover"})}/>
    </div>
   
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ fontFamily: 'Raleway', width: '70%', maxWidth: 500 , marginTop: 20,textAlign: "right",color:"purple", marginLeft:"400px"}}>
    
      <Typography variant="h3" gutterBottom>
      !  {user?.Name}  ברוכים הבאים 
      </Typography>
 
      <Typography 
      variant="subtitle1" 
      gutterBottom  
      style={{ backgroundColor: "Pink",  
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      
      // height: "50vh",
      }}>
       ב"אור רסיפיז" 
        האתר השיתופי של המתכונים , תוכלו למצוא את המתכונים הכי חלומיים. עם טעם של אחדות ושיתוף 
        תצאו עם טעם של עוד...
          אצלינו ניתן למצוא וגם לשתף, מגוון רחב, מתכונים מהמנה הראשונה עד למנה האחרונה, ממתכוני שבת 
          וחג עד מתכוני יום יום.
          ב"אור רסיפיז" 
       אתר שיתוף המתכונים  
        תצאו עם הטעם הכי טוב שיש-
         לתת ולקבל
      </Typography>
      <Typography variant="h5" gutterBottom style={{textAlign:"left"}}>
        ,איתכם לאורך כל הדרך
      </Typography>
      <Typography variant="h5" gutterBottom style={{paddingBottom:"50px",textAlign:"left"}}>
      <img src={logo} style={{width:"75px",zIndex:"-1", border:"5px double "}}/>   "לטעום ולחלום" 
      </Typography>
      <div style={{backgroundColor:"purple", width:"100%"}}></div>
    </Box>
    </ThemeProvider>

   
      
    </>
  )
}

export default Home
