import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
// import { withRouter } from "react-router-dom";

const burger = props => {
  //we can't access the props of Route in Burger buecasue Route only wrap BurgerBUilder anc checkout but we can
  // access it here by using withRouter.
  // console.log(props);
  //we convert obejct ingredients to an array so we can loop through, this used because we have to pass the type
  // to burgeringredient for our graphical representation
  // see this link https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/8109018#questions/3501504
  //transformedIngredients is just an array just an array of many array. so how we check if it is empty
  // so we reduce it means flatten it means pull the values of many arrays into one array.
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  //console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding Ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
// export default withRouter(burger);
