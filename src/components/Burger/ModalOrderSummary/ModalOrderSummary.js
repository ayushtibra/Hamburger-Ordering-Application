import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Burger/UI/Button/Button";

class ModalOrderSummary extends Component {
  componentWillUpdate() {
    // console.log("[ModalOrderSummary] will update");
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>There are your Ingredients</p>
        <ul>{ingredients}</ul>
        <p>Continue to Checkout ?</p>
        <p>
          <strong>Payment Pending: </strong> {this.props.price.toFixed(2)}
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Order
        </Button>
      </Aux>
    );
  }
}

export default ModalOrderSummary;
