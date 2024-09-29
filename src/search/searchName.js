import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';



const SearchName =({setName}) => {
  
  return (
    <>
    <Box sx={{ flexGrow: 1 }}
       component="form"
      //  sx={{
      //    '& > :not(style)': { m: 1, width: '25ch' },
      //  }}
       noValidate
       autoComplete="on">
          <InputLabel id="demo-simple-select-label">   
                          בחר לפי שם מתכון:
          </InputLabel>
          <TextField 
            id="standard-basic" 
            label={<SearchIcon/>}
            variant="standard" 
            onChange={(e) => setName(e.target.value)} />
          
    </Box>
    </>
  )
}

export default SearchName
