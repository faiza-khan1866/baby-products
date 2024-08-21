import {
    put,
    takeLatest,
    takeEvery,
    select,
} from "redux-saga/effects";
// import { toast } from "react-toastify";
import { types } from "./types";
// import * as service from "./service";
import { history } from "./../../history";
// import * as selectors from './selectors';

function* add_cart_p(action) {
    // debugger;
    try {

        yield put({
            type: "ADD_CART_PRODUCT",
            payload: {
                data: action.data,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

function* add_promo_code_discount(action) {
    // debugger;
    try {

        yield put({
            type: "ADD_PROMO_CODE",
            payload: {
                promoCode: action.promoCode,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

function* remove_promo_code_discount(action) {
    try {

        yield put({
            type: types.REMOVE_PROMO_CODE,
        });
    } catch (error) {
        console.log(error);
    }
}

function* removeCartProduct(action) {
    // debugger;
    // console.log("action.data")
    // console.log(action.productCode)
    try {

        yield put({
            type: "REMOVE_CART_PRODUCT",
            productCode: action.productCode,
            invoker:action.invoker
        });
    } catch (error) {
        console.log(error);
    }
}

function* emptyCart(action) {
    // debugger;
    // console.log("action.data")
    // console.log(action.invoker)
    try {

        yield put({
            type: "EMPTY_CART_FULL",
            invoker:action.invoker
        });
    } catch (error) {
        console.log(error);
    }
}

function* emptySwal(action) {
    // debugger;
    // console.log("action.data emptySwal")
    try {

        yield put({
            type: "REMOVE_SWAL_TEXT",
        });
    } catch (error) {
        console.log(error);
    }
}

function* tranRef(action) {
    // debugger;
    // console.log("action.data emptySwal")
    try {

        yield put({
            type: "ADD_TRAN_REF",
            tran_ref: action.tran_ref,
            order_id: action.order_id
        });
    } catch (error) {
        console.log(error);
    }
}
function* changeProductQuantity(action) {
    // debugger;
    try {

        yield put({
            type: "CHANGE_CART_PRODUCT_QUANTITY",
            payload: {
                productCode: action.payload.productCode,
                quantity: action.payload.quantity,
                qtyType: action.payload.qtyType
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export default function* cartWatcher() {
    yield takeLatest("ADD_PRODUCT_C", add_cart_p);
    yield takeLatest("ADD_PROMO_CODE_DISCOUNT", add_promo_code_discount);
    yield takeLatest("REMOVE_PROMO_CODE_DISCOUNT", remove_promo_code_discount);
    yield takeEvery("EMPTY_CART", emptyCart);
    yield takeEvery("REMOVE_PRODUCT_FROM_CART", removeCartProduct);
    yield takeEvery("CHANGE_PRODUCT_QUANTITY", changeProductQuantity);
    yield takeEvery("EMPTY_SWAL", emptySwal);
    yield takeEvery("TRAN_REF", tranRef);
}
