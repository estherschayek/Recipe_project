import React, { Fragment, useState } from 'react'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useSelector,useDispatch} from 'react-redux'
import { editBayByUser } from '../store/actions/actionBay';




const RecipeIngredientsToAdd = ({ ingredients }) => {


  const userId = useSelector((state) => state.user.user.Id)
  const dispatch=useDispatch()
  const send = (event) => {
    const [ingredient, type, name] = event.target.name.split('-');
    const count=parseFloat(ingredient)

    const data = {
      UserId: userId,
      Count:count,
      Name:`${type} ${name}`,
   };

  
  console.log("dataBayCheckbox", data)
  console.log("COUNT:", data.Count);
  console.log("DATANAME:", data.Name);

  dispatch(editBayByUser(data));  

  }

  return (
    <>
      {ingredients ? <Fragment>
        <Typography variant="h6" gutterBottom>
          להוספת הרכיבים לרשימת הקניות לחץ על הכפתור הסמוך לרכיב
        </Typography>

        <FormGroup>
          {ingredients.map((ingredient, index) => (

            <FormControlLabel
              key={index}
              required
              control={
                <Checkbox
                  onChange={send}
                  name={`${ingredient.Count}-${ingredient.Type}-${ingredient.Name}`}
                  value={ingredient}
                  data={ingredient}
                />
              }
             
              label={`${ingredient.Count}-${ingredient.Type}-${ingredient.Name}`}
            />

          ))}

        </FormGroup>

      </Fragment> : null}

    </>
  )
}

export default RecipeIngredientsToAdd
