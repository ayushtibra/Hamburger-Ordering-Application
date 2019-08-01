import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Burger/UI/Modal/Modal";
import ModalOrderSummary from "../../components/Burger/ModalOrderSummary/ModalOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// const ingredientsPrice = {
//   salad: 10,
//   bacon: 20,
//   meat: 30,
//   cheese: 40
// };

//ppurchasable is for OrderNow button to active or disable
//purchasing for modal to show or not when click on order now button
//loading for showing spinner
//error for showing error message
class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 40,
    // purchasable: false,
    purchasing: false
    // loading: false
    // error: false
  };

  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredient();

    // axios
    //   .get("https://burger-create-63d20.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }
  //function to disable or activate Order Now button
  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
    // this.setState({ purchasable: sum > 0 });
  }

  // //Function when click on button to add more ingredient
  // ingredientsAddedHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const UpdatedPrice = oldPrice + ingredientsPrice[type];
  //   this.setState({
  //     totalPrice: UpdatedPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchasableState(updatedIngredients);
  // };

  // //Function when click on button to remove more ingredient
  // ingredientsRemovedHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const UpdatedPrice = oldPrice - ingredientsPrice[type];
  //   this.setState({
  //     totalPrice: UpdatedPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchasableState(updatedIngredients);
  // };

  //function to show modal when click on order now button
  modalShowPurchasing = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  //function to close model when click on cancel or backdrop
  modalClosedPurchasingCanceled = () => {
    this.setState({ purchasing: false });
  };
  //function when click on continue button in modal
  modalshowPurchasingContinued = () => {
    // this.setState({ loading: true });
    // // alert("Payment Pending:");
    // const order = {
    //   ingredient: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customers: {
    //     name: "Ayush",
    //     email: "a@test.com",
    //     address: {
    //       zipcode: "333001",
    //       street: "Village Road"
    //     }
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //     // return console.log(response);
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //     // return console.log(error);
    //   });

    // this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.price);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    //to disable the less button if ingredient is less than 0
    const disableInfo = {
      ...this.props.ings
    };

    for (let keys in disableInfo) {
      disableInfo[keys] = disableInfo[keys] <= 0;
    }
    // salad:true,....
    let modelOrderSummary = null;
    let burger = this.props.error ? <p>Ingredients not loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientsAdded}
            ingredientsRemoved={this.props.onIngredientsRemove}
            ordered={this.modalShowPurchasing}
            disable={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchasableState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      modelOrderSummary = (
        <ModalOrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.modalClosedPurchasingCanceled}
          purchaseContinued={this.modalshowPurchasingContinued}
        />
      );
    }

    // if (this.state.loading) {
    //   modelOrderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalClosedPurchasingCanceled}
        >
          {modelOrderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
