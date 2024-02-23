const urlConstants = {
  GETUSERLISTURL:
    "https://0yzmwck4o5.execute-api.ap-south-1.amazonaws.com/brickar-dev/api/v1/admin/user/?skip=0&limit=20",

  CSRFTOKEN_URL: "api/csrf-token",
  RE_FRESH_URL: "api/refresh",
  LOGIN_URL: "api/login",
  GET_WORK_TYPE_URL: "api/v1/admin/worktype/common",
  GET_EDUCATION_URL: "api/v1/admin/education",
  FETCH_EDUCATION_URL: "api/v1/common/education",
  FETCH_ROLES_URL: "api/v1/common/roles",
  GET_ROLES_URL: "api/v1/admin/role",
  GET_CATEGORY_URL : "api/categories",
  GET_SUBCATEGORY_URL : "api/sub-categories",
  GET_SUBCATEGORY_EDIT_URL : "api/sub-category",
  ADD_SUBCATEGORY_URL : "api/sub-category",
  GET_SLIDER_URL : "api/sliders",
  EDIT_SLIDER_URL : "api/slider",
  SLIDER_IMAGE_URL : "api/slider-image",
  SLIDER_IMAGE_ADD : "api/add-slider-image",
  GET_PAGE_URL : "api/pages",
  PAGE_URL : "api/page",
  PAGE_IMAGE_ADD_URL : "api/add-page-image",
  PAGE_IMAGE_URL : "api/page-image",
  PAGE_IMAGE_BANNER : "api/update-banner-image",
  GET_NEWS_URL : "api/news",
  EDIT_NEWS_URL : "api/news",
  NEWS_IMAGE_URL : "api/news-image",
  NEWS_IMAGE_ADD : "api/add-news-image",
  NEWS_IMAGE_DATA_UPDATE : "api/news-image-data-update"
};
export default urlConstants;
