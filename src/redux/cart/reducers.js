import { types } from "./types.js";

let initialState = {
  cart: [],
  paymentDetails: {
    productsValue: 0,
    discount: 0,
    shippingCharges: 0,
    subTotal: 0,
    finalTotal: 0,
    shippingCharges: 0,
  },
  promoCode: {},
  cartBit: false,
  swalMsg: "",
  tran_ref: "",
  order_id: "",
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART_PRODUCT: {
      let newstate = state;
      let existingProductBit = false;
      let existingProduct = newstate.cart.filter((x) => {
        // let oldPrice = x.quantity * x.price
        // let newPrice = action.payload.data.quantity * x.price
        if (x.productCode == action.payload.data.productCode) {
          existingProductBit = true;
          x.quantity += 1;

          // newstate.paymentDetails.productsValue -= oldPrice
          // newstate.paymentDetails.subTotal -= oldPrice
          // newstate.paymentDetails.finalTotal -= oldPrice

          // newstate.paymentDetails.productsValue += newPrice
          // newstate.paymentDetails.subTotal += newPrice
          // newstate.paymentDetails.finalTotal += newPrice
          // if(newstate.paymentDetails.subTotal < 100){
          //     newstate.paymentDetails.shippingCharges = 20
          // }

          newstate.cartBit = !newstate.cartBit;
        }

        return x;
      });

      if (action.payload.data.invoker == "cart") {
        newstate.swalMsg = "Product added to cart successfully";
      }

      if (!existingProductBit) {
        newstate.cart.push(action.payload.data);
        // let price = action.payload.data.price * action.payload.data.quantity
        // let discounted_price = action.payload.data.discounted_price * action.payload.data.quantity

        // newstate.paymentDetails.discount += action.payload.data.price
        // newstate.paymentDetails.shippingCharges += action.payload.data.price
        // if(action.payload.data.discounted_price > 0){
        //     price = discounted_price
        //     newstate.paymentDetails.productsValue += discounted_price
        // } else {
        //     newstate.paymentDetails.productsValue += price
        // }
        // newstate.paymentDetails.subTotal += price
        // newstate.paymentDetails.finalTotal += price

        // if(newstate.paymentDetails.subTotal < 100){
        //     newstate.paymentDetails.shippingCharges = 20
        // } else {
        //     newstate.paymentDetails.shippingCharges = 0
        // }

        newstate.cartBit = !newstate.cartBit;
        if (action.payload.data.invoker == "cart") {
          newstate.swalMsg = "Product Added to cart successfully";
        }
      }

      return {
        ...newstate,
      };
    }

    case types.ADD_PROMO_CODE: {
      let initState = JSON.parse(JSON.stringify(state));
      initState.promoCode = action.payload.promoCode;
      return initState;
    }
    case types.REMOVE_PROMO_CODE: {
      let initState = JSON.parse(JSON.stringify(state));
      initState.promoCode = {};
      return initState;
    }

    case types.REMOVE_CART_PRODUCT: {
      let newstate2 = state;
      let product = newstate2.cart.find(
        (x) => x.productCode == action.productCode
      );
      let price = 0;
      if (product.discounted_price > 0) {
        price = product.quantity * product.discounted_price;
      } else {
        price = product.quantity * product.price;
      }

      // newstate2.paymentDetails.productsValue -= price
      // newstate2.paymentDetails.discount += action.payload.data.price
      // newstate2.paymentDetails.shippingCharges += action.payload.data.price
      // newstate2.paymentDetails.subTotal -= price
      // if(newstate2.paymentDetails.subTotal < 100){
      //     newstate2.paymentDetails.shippingCharges = 20
      // } else {
      //     newstate2.paymentDetails.shippingCharges = 0
      // }
      // newstate2.paymentDetails.finalTotal -= price

      // if(newstate2.paymentDetails.subTotal < 100){
      //     newstate2.paymentDetails.shippingCharges = 20
      // } else {
      //     newstate2.paymentDetails.shippingCharges = 0
      // }

      newstate2.cart = newstate2.cart.filter(
        (x) => x.productCode != action.productCode
      );

      newstate2.cartBit = !newstate2.cartBit;

      if (action.invoker == "wishlist") {
        newstate2.swalMsg = "Product added to wishlist";
      } else {
        newstate2.swalMsg = "Product removed from cart";
      }
      return {
        ...newstate2,
      };
    }
    case types.EMPTY_CART_FULL: {
      let obj = {
        cart: [],
        paymentDetails: {
          productsValue: 0,
          discount: 0,
          shippingCharges: 0,
          subTotal: 0,
          finalTotal: 0,
          shippingCharges: 0,
        },
        promoCode: {},
        cartBit: false,
        swalMsg: "",
        tran_ref: "",
        order_id: "",
      };
      // console.log("empty cart is here eee eee", obj);
      obj.cartBit = !state.cartBit;
      if (action.invoker == "paymentSuccess") {
        obj.swalMsg = "Order placed successfully";
      } else {
        obj.swalMsg = "";
      }
      return obj;
    }

    case types.REMOVE_SWAL_TEXT: {
      let newstate2 = state;
      newstate2.swalMsg = "";
      return {
        ...newstate2,
      };
    }
    case types.ADD_TRAN_REF: {
      let newstate2 = state;

      // console.log("action", action.order_id);
      newstate2.tran_ref = action.tran_ref;
      newstate2.order_id = action.order_id;
      return {
        ...newstate2,
      };
    }
    case types.REMOVE_TRAN_REF: {
      let newstate2 = state;
      newstate2.tran_ref = "";
      newstate2.order_id = "";
      return {
        ...newstate2,
      };
    }

    case types.CHANGE_CART_PRODUCT_QUANTITY: {
      let newstate = state;
      let product = {};
      // console.log("action.payload", action.payload)
      newstate.cart.forEach((element2, index2, array) => {
        if (element2.productCode == action.payload.productCode) {
          product = element2;
          array[index2].quantity = action.payload.quantity;
        }
      });

      // console.log(product,"product ===")
      // if (action.payload.qtyType == "increment") {

      // newstate.paymentDetails.productsValue += product.price

      // if(product.discounted_price > 0){
      //     newstate.paymentDetails.subTotal += product.discounted_price
      //     newstate.paymentDetails.finalTotal += product.discounted_price
      // } else {
      //     newstate.paymentDetails.subTotal += product.price
      //     newstate.paymentDetails.finalTotal += product.price
      // }
      // // newstate.paymentDetails.discount += action.payload.data.price
      // // newstate.paymentDetails.shippingCharges += action.payload.data.price
      // // newstate.paymentDetails.subTotal += product.price

      // if(newstate.paymentDetails.subTotal < 100){
      //     newstate.paymentDetails.shippingCharges = 20
      // } else {
      //     newstate.paymentDetails.shippingCharges = 0
      // }
      // newstate.product

      // } else {

      //     // newstate.paymentDetails.productsValue -= product.price
      //     // newstate.paymentDetails.discount += action.payload.data.price
      //     // newstate.paymentDetails.shippingCharges += action.payload.data.price
      //     // newstate.paymentDetails.subTotal -= product.price

      //     if(product.discounted_price > 0){
      //         newstate.paymentDetails.subTotal -= product.discounted_price
      //         newstate.paymentDetails.finalTotal -= product.discounted_price
      //     } else {
      //         newstate.paymentDetails.subTotal -= product.price
      //         newstate.paymentDetails.finalTotal -= product.price
      //     }

      //     if(newstate.paymentDetails.subTotal < 100){
      //         newstate.paymentDetails.shippingCharges = 20
      //     } else {
      //         newstate.paymentDetails.shippingCharges = 0
      //     }
      //     // newstate.paymentDetails.finalTotal -= product.price
      // }

      newstate.cartBit = !newstate.cartBit;

      return {
        ...newstate,
      };
    }

    default: {
      return state;
    }
  }
};
export default cartReducer;
