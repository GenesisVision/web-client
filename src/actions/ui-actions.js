export const WINDOW_RESIZE = "WINDOW_RESIZE";

export const windowResize = (innerWidth, innerHeight) => ({
  type: WINDOW_RESIZE,
  innerWidth,
  innerHeight
});

export const initOnResizeEvent = () => {
  let timer;
  return dispatch => {
    dispatch(windowResize(window.innerWidth, window.innerHeight));

    window.onresize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(windowResize(window.innerWidth, window.innerHeight));
      }, 166);
    };
  };
};
