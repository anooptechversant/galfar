import React from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Pages/Layout";
import Test from "./Pages/Test";
import { Provider } from "react-redux";
import store from "./store";
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import Users from "./Pages/Menu/Users";
import WorkType from "./Pages/Menu/Worktype/WorkType";
import AddWorkType from "./Pages/Menu/Worktype/AddWorkType";
import Education from "./Pages/Menu/Education/Education";
import AddEducation from "./Pages/Menu/Education/AddEducation";
import Roles from "./Pages/Menu/Roles/Roles";
import AddRoles from "./Pages/Menu/Roles/AddRoles";
import Category from "./Pages/Menu/Category/Category";
import SubCategory from "./Pages/Menu/SubCategory/SubCategory";
import AddSubcategory from "./Pages/Menu/SubCategory/AddSubCategory";
import Slider from "./Pages/Menu/Sliders/Slider";
import SliderImage from "./Pages/Menu/Sliders/SliderImage";
import AddSlider from "./Pages/Menu/Sliders/AddSlider";
import Page from "./Pages/Menu/Pages/Page";
import AddPage from "./Pages/Menu/Pages/AddPage";
import News from "./Pages/Menu/News/News";
import AddNews from "./Pages/Menu/News/AddNews";
import NewsImage from "./Pages/Menu/News/NewsImage";


function App() {
    const refreshAccessToken = localStorage.getItem("userInfo");
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter /* basename="/test-galfar-client" */>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='' element={<Layout />}>
                {/* <Route path='' element={<Dashboard />} /> */}
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='test' element={<Test />} />
                <Route path='users' element={<Users />} />
                <Route path='worktypes' element={<WorkType />} />
                <Route path='add-worktype' element={<AddWorkType />} />
                <Route path='edit-worktype/:id' element={<AddWorkType />} />
                <Route path='education' element={<Education />} />
                <Route path='edit-education/:id' element={<AddEducation />} />
                <Route path='add-education' element={<AddEducation />} />
                <Route path='roles' element={<Roles />} />
                <Route path='edit-roles/:id' element={<AddRoles />} />
                <Route path='add-roles' element={<AddRoles />} />
                <Route path='category' element={<Category />} />
                <Route path='sub-category' element={<SubCategory />} />
                <Route path='add-sub-category' element={<AddSubcategory />} />
                <Route path='edit-sub-category/:id' element={<AddSubcategory />} />
                <Route path='sliders' element={<Slider />} />
                <Route path='edit-slider-images/:id' element={<SliderImage />} />
                <Route path='add-slider' element={<AddSlider />} />
                <Route path='edit-slider/:id' element={<AddSlider />} />
                <Route path='pages' element={<Page />} />
                <Route path='add-page' element={<AddPage />} />
                <Route path='edit-page/:id' element={<AddPage />} />
                <Route path="news" element={<News/>}/>
                <Route path='add-news' element={<AddNews />} />
                <Route path='edit-news/:id' element={<AddNews />} />
                <Route path='edit-news-images/:id' element={<NewsImage/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    );
}

export default App;
