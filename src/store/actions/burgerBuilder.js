import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.INGREDIENT_ADD,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    ingredientName: name
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FALIED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("https://burger-create-63d20.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientFailed());
      });
  };
};
