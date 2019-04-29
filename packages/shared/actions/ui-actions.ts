import debounce from "debounce";
import { Dispatch } from "redux";
export const WINDOW_RESIZE = "WINDOW_RESIZE";
export const WINDOW_SCROLL = "WINDOW_SCROLL";

export const windowResize = (
  innerWidth = window.innerWidth,
  innerHeight = window.innerHeight
) => ({
  type: WINDOW_RESIZE,
  innerWidth,
  innerHeight
});

export const initOnResizeEvent = () => (dispatch: Dispatch) => {
  const dispatchResize = () => dispatch(windowResize());
  dispatchResize();
  window.onresize = debounce(dispatchResize, 166);
};

export const windowScroll = (scrollTop: number) => {
  return {
    type: WINDOW_SCROLL,
    scrollTop
  };
};
