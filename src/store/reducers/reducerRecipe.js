import * as actionType from "../actionsName";

const initialState = {
  recipe: [],
};

const reducerRecipe = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ALL_RECIPE:
      return { ...state, recipe: action.recipe };

    case actionType.ADD_RECIPE: {
      const recipies = [...state.recipe];
      const newRecipe = action.recipe;
  
      const newRecipes = [...recipies, newRecipe];
       console.log("old",recipies)
      
      console.log("newRecipe after pushing the added one",newRecipes)
      return { ...state, recipe: newRecipes };
    }
    
    case actionType.DELETE_RECIPE: {
      const recipies = [...state.recipe];
      const filteredRecipes = recipies.filter((recipe) => recipe.Id != action.recipe);
      return { ...state, recipe: filteredRecipes };
    }

    default:
      return { ...state };
  }
};

export default reducerRecipe;
