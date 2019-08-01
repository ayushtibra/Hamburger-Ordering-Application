import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utilityFunction";

const initialState = {
  ingredients: null,
  totalPrice: 40,
  error: false,
  building: false
};

const ingredientsPrice = {
  salad: 10,
  bacon: 20,
  meat: 30,
  cheese: 40
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + ingredientsPrice[action.ingredientName],
    building: true
  };
  return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updatedObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - ingredientsPrice[action.ingredientName],
    building: true
  };
  return updatedObject(state, updatedSt);
};

//whenever set ingrediet call means burger at inital state
const setIngredient = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese
    },
    totalPrice: 40,
    error: false,
    building: false
  });
};

const fetchIngredientFailed = (state, action) => {
  return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADD:
      return addIngredient(state, action);
    case actionTypes.INGREDIENT_REMOVE:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENT_FALIED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

// case actionTypes.INGREDIENT_ADD:
//       return {
//         ...state,
//         ingredients: {
//           ...state.ingredients,
//           [action.ingredientName]: state.ingredients[action.ingredientName] + 1
//         },
//         totalPrice: state.totalPrice + ingredientsPrice[action.ingredientName]
//       };
//     case actionTypes.INGREDIENT_REMOVE:
//       return {
//         ...state,
//         ingredients: {
//           ...state.ingredients,
//           [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//         },
//         totalPrice: state.totalPrice - ingredientsPrice[action.ingredientName]
//       };
//     case actionTypes.SET_INGREDIENT:
//       return {
//         ...state,
//         ingredients: {
//           salad: action.ingredients.salad,
//           bacon: action.ingredients.bacon,
//           meat: action.ingredients.meat,
//           cheese: action.ingredients.cheese
//         },
//         totalPrice: 40,
//         error: false
//       };
//     case actionTypes.FETCH_INGREDIENT_FALIED:
//       return {
//         ...state,
//         error: true
//       };
//     default:
//       return state;
