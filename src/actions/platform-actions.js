import SwaggerInvestorApi from "../services/api-client/swagger-investor-api";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";
export const WINDOW_RESIZE = "WINDOW_RESIZE";

const fetchPlatformSettings = {
  type: PLATFORM_SETTINGS,
  payload: SwaggerInvestorApi.apiInvestorPlatformStatusGet()
};

const windowResize = (height, width) => ({
  type: WINDOW_RESIZE,
  height,
  width
});

const initEnvironment = () => dispatch => {
  dispatch(windowResize(window.innerHeight, window.innerWidth));

  window.onresize = () => {
    dispatch(windowResize(window.innerHeight, window.innerWidth));
  };
};

const platformActions = {
  fetchPlatformSettings,
  initEnvironment
};

export default platformActions;
