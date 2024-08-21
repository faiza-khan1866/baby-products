import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../redux/users/reducers";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import productsWatcher from "./../redux/products/sagas";
import { productReducer } from "../redux/products";
import globalReducer from "../redux/global/reducers";
import cartReducer from "../redux/cart/reducers";
import globalWatcher from "../redux/global/sagas";
import cartWatcher from "../redux/cart/sagas";
import { pagesReducer } from "../redux/pages/pagesReducer";

const persistConfig = {
  key: "root",
  storage,
};

function* rootSaga() {
  yield all([fork(productsWatcher)]);
  yield all([fork(globalWatcher)]);
  yield all([fork(cartWatcher)]);
}

const rootReducer = combineReducers({
  globalReducer: globalReducer,
  cartReducer: cartReducer,
  userReducer: authReducer,
  productReducer: productReducer,
  allPages: pagesReducer
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware, thunk)
  );
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware, thunk));
}

export const store = createStore(
  persistedReducer,
  enhancer
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
