import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true
  // };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    // axios
    //   .get("/orders.json")
    //   .then(res => {
    //     const fetchOrders = [];
    //     for (let key in res.data) {
    //       fetchOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     console.log(res.data);
    //     this.setState({ loading: false, orders: fetchOrders });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
