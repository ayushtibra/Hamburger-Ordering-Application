import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../Burger/UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2> Hope Burger Taste Well!</h2>

      <div style={{ margin: "auto", width: "100%" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
