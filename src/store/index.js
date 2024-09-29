import {createStore,combineReducers, applyMiddleware} from 'redux'
import reducer from './reducers/reducerUser'
import Thunk from 'redux-thunk';
import reducerRecipe from './reducers/reducerRecipe'
import reducerBay from "./reducers/reducerBay"
import reducerCategory from "./reducers/reducerCategory"

const reducers=combineReducers({
    user:reducer,
    recipe:reducerRecipe,
    bayUser:reducerBay,
    category:reducerCategory,

})

export const store=createStore(reducers, applyMiddleware(Thunk));