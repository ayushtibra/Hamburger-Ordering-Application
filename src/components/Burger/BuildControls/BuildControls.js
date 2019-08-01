import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const control = [
  { ingredientsLabel: "Salad:", type: "salad", price: 10 },
  { ingredientsLabel: "Bacon:", type: "bacon", price: 20 },
  { ingredientsLabel: "Meat:", type: "meat", price: 30 },
  { ingredientsLabel: "Cheese:", type: "cheese", price: 40 }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total Price is: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {control.map(ctrl => (
      <BuildControl
        key={ctrl.ingredientsLabel}
        label={ctrl.ingredientsLabel}
        disabled={props.disable[ctrl.type]}
        price={ctrl.price}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? "Order Now" : "Sign Up To Continue"}
    </button>
  </div>
);

export default buildControls;
