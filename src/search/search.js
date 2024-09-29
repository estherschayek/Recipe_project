import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { allRecipies } from '../store/actions/actionRecipe';
import SearchCategory from './searchCategory';
import SearchDifficulty from './searchDifficulty';
import SearchTime from './searchTime';
import SearchName from './searchName';
import RecipeArrBasic from './recipeArrBasic'
import VideoPlayer from "../videoPlayerRecipe"
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Search = () => {
  const dispatch = useDispatch();

 
  const recipe = useSelector((state) => state.recipe.recipe);
  
  useEffect(() => {
    {
      if (!recipe.length)
      dispatch(allRecipies());
    }
  }, []);
  
  const [category, setCategory] = useState('');
  const [time, setTime] = useState(0);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [showFullList, setShowFullList] = useState(true);
  const [recipeShow, setRecipeShow] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(category, "category", time, "time", difficulty, "difficulty")
    const newList = recipe.filter((item) => (!category || category == item.CategoryId) &&
      (!time || time >= item.Duration) &&
      (!difficulty || difficulty == item.Difficulty)
    );
    console.log(newList, recipe)

    setRecipeShow(newList);
    setShowFullList(false);
  };


  const handleNameSubmit = (event) => {
    event.preventDefault();

    const newList = recipe.filter(
      (item) =>

        !name || item.Name.includes(name)
    );

    setRecipeShow(newList);
    setShowFullList(false);
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
      <VideoPlayer />

      <ThemeProvider theme={theme}>

        <form onSubmit={handleSubmit}>
          <Box sx={{ fontFamily: 'Raleway', width: '100%', marginTop: 10, textAlign: "left", color: "purple", marginLeft: "500px", marginRight: "auto" }}>

            <Typography variant="h1" gutterBottom>
              מתכונים
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 10,
              marginRight: 6,
              marginLeft: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 14,
              paddingLeft: 14,
              direction: "rtl"
            }}
          >

            <SearchCategory selectedCategory={setCategory} />
            <SearchDifficulty setSelectedDifficulty={setDifficulty} />
            <SearchTime setDuration={setTime} />
            <Button type="submit"
              sx={{ width: '20%', mt: 2, mb: 2 }}
              variant="contained"

              color="primary">חפש</Button>
          </Box>
        </form>

      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleNameSubmit}>
          <Box
            sx={{
              marginTop: 8,
              marginRight: 4,
              marginLeft: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 20,
              paddingLeft: 20,
              direction: "rtl",
              gap: "50px"
            }}
          >
            <SearchName setName={setName} />
            <Button type="submit"
              sx={{ width: '100px', mt: 3, mb: 2 }}
              variant="contained"

              color="primary">חפש</Button>
          </Box>
        </form>
      </ThemeProvider>
      {showFullList ? (
        <RecipeArrBasic recipe={recipe} />
      ) : (
        <RecipeArrBasic recipe={recipeShow} />
      )}
    </>
  );
};

export default Search;