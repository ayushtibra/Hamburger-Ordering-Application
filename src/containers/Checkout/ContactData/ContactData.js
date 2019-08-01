import React, { Component } from "react";

import Button from "../../../components/Burger/UI/Button/Button";
import Spinner from "../../../components/Burger/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/Burger/UI/Input/Input";
import withErrorHandler from ".././../../hoc/withErrorHandler/withErrorHandler";
import { updatedObject, checkValidity } from "../../../shared/utilityFunction";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        formIsValid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        formIsValid: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false,
        formIsValid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        formIsValid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
          // isEmail:true
        },
        valid: false,
        touched: false,
        formIsValid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true,
        formIsValid: false
      }
    }
    // loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  };

  // checkValidity(value, rules) {
  //   // let isValid = false;
  //   let isValid = true;

  //   //for double check as we not required validation in deliveryMethod but if we not add validation then it
  //   //show error so two ways 1) set validation={} 2)
  //   if (!rules) {
  //     return true;
  //   }

  //   if (rules.required) {
  //     isValid = value.trim() !== "" && isValid;
  //   }

  //   if (rules.minLength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }

  //   if (rules.maxLength) {
  //     isValid = value.length <= rules.minLength && isValid;
  //   }
  //   // without adding && isValid in all those above rules it not working, only last statement execute so to
  //   // execute all of the above add isValid in all and set isValid = true inititally.
  //   // if (rules.isEmail) {
  //   //   const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-] + (?:\.[a-z0-9])
  //   //   isValid = pattern.test(value) && isValid
  //   // }

  //   if (rules.isNumeric) {
  //     const pattern = /^\d+$/;
  //     isValid = pattern.test(value) && isValid;
  //   }

  //   return isValid;
  // }

  inputChangedHandler = (event, inputIdentifier) => {
    // //console.log(event.target.value);
    // const updatedOrderForm = {
    //   ...this.state.orderForm
    // };
    // //this is not completely clone so to deeply clone we again.
    // const updatedFormElement = {
    //   ...updatedOrderForm[inputIdentifier]
    // };
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    // updatedFormElement.touched = true;
    // updatedOrderForm[inputIdentifier] = updatedFormElement;

    const updatedFormElement = updatedObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedOrderForm = updatedObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    // console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    //convert my state object to an array so I can loop through
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
