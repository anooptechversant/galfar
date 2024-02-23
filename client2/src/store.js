import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./Reducers/commonReducer";
import logInReducer from "./Features/logInSlice";
import workTypeReducer from "./Features/workTypeSlice";
import educationReducer from "./Features/educationSlice";
import rolesReducer from "./Features/rolesSlice";
import categoryReducer from "./Features/categorySlice";
import subCategoryReducer from "./Features/subCategorySlice";
import sliderReducer from "./Features/sliderSlice";
import activeMenuReducer from "./Features/activeMenuSlice";
import pageReducer from "./Features/pageSlice";
import newsReducer from "./Features/NewsSlice";
const store = configureStore({
  reducer: {
    common: commonReducer,
    logIn: logInReducer,
    workType: workTypeReducer,
    education: educationReducer,
    roles: rolesReducer,
    category: categoryReducer,
    subCategory : subCategoryReducer,
    slider : sliderReducer,
    activeMenu : activeMenuReducer,
    page : pageReducer,
    news : newsReducer
  },
});

export default store;
