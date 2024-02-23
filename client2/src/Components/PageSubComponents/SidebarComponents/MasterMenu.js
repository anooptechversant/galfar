import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function MasterMenu() {
  const data = useSelector((state) => state);
  return (
    <li className='nav-item'>
      <a
        className={`nav-link ${data.activeMenu.activeData === "" ? "collapsed" : ""}`}
        href='#'
        data-toggle='collapse'
        data-target='#collapsePages'
        aria-expanded={`${data.activeMenu.activeData == "" ? "false" : 'true'}`}
        aria-controls='collapsePages'
      >
        <i className='fas fa-fw fa-folder'></i>
        <span>Master Section</span>
      </a>
      <div
        id='collapsePages'
        className={`collapse ${data.activeMenu.activeData === "" ? "" : "show"}`}
        aria-labelledby='headingPages'
        data-parent='#accordionSidebar'
      >
        <div className='bg-white py-2 collapse-inner rounded'>
          <h6 className='collapse-header'>Work Types:</h6>
          <Link className={`collapse-item ${data.activeMenu.activeData === "category" ? "active" : ""}`} to='/category'>
            Category
          </Link>
          <Link className={`collapse-item ${data.activeMenu.activeData === "sub-category" ? "active" : ""}`} to='/sub-category'>
            Sub Category
          </Link>
          <Link className={`collapse-item ${data.activeMenu.activeData === "sliders" ? "active" : ""}`} to='/sliders'>
            Sliders
          </Link>
          <Link className={`collapse-item ${data.activeMenu.activeData === "pages" ? "active" : ""}`} to='/pages'>
            Pages
          </Link>
          <Link className={`collapse-item ${data.activeMenu.activeData === "news" ? "active" : ""}`} to='/news'>
            News
          </Link>
          <div className='collapse-divider'></div>
        </div>
      </div>
    </li>
  );
}

export default MasterMenu;
