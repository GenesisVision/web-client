import { debounce } from "lodash";
import { UiSize } from "reducers/ui-reducer";
import { Dispatch } from "redux";
import { ActionType } from "utils/types";

export const WINDOW_RESIZE = "WINDOW_RESIZE";
export const WINDOW_SCROLL = "WINDOW_SCROLL";

export type TWindowResizeAction = ActionType<UiSize>;
export const windowResizeAction = (
  innerWidth = window.innerWidth,
  innerHeight = window.innerHeight
): TWindowResizeAction => ({
  type: WINDOW_RESIZE,
  payload: { innerWidth, innerHeight }
});

export const initOnResizeEvent = () => (dispatch: Dispatch) => {
  const dispatchResize = () => dispatch(windowResizeAction());
  dispatchResize();
  window.onresize = debounce(dispatchResize, 166);
};

export type TWindowScrollAction = ActionType<number>;
export const windowScrollAction = (payload: number): TWindowScrollAction => ({
  type: WINDOW_SCROLL,
  payload
});
