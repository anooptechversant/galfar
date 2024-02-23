import { applyMiddleware, combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk"; // This middleware allows handling async actions
import loginReducer from "./Reducers/loginReducer";
import commonReducer from "./Reducers/commonReducer";
import testMiddleware from "./Middlewares/testMiddleware";

const rootReducer = combineReducers({
    login: loginReducer,
    common : commonReducer

});

const store = configureStore({
    reducer: rootReducer
  });

export default store;
