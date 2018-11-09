import debounce from "debounce";

export const WINDOW_RESIZE = "WINDOW_RESIZE";
export const WINDOW_SCROLL = "WINDOW_SCROLL";

export const windowResize = (innerWidth, innerHeight) => ({
  type: WINDOW_RESIZE,
  innerWidth,
  innerHeight
});

export const initOnResizeEvent = () => dispatch => {
  const dispatchResize = () =>
    dispatch(windowResize(window.innerWidth, window.innerHeight));
  dispatchResize();
  window.onresize = debounce(dispatchResize, 166);
};

export const windowScroll = scrollTop => {
  return {
    type: WINDOW_SCROLL,
    scrollTop
  };
};
