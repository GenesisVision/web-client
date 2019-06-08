import { combineReducers } from "redux";
import {
  TWindowResizeAction,
  TWindowScrollAction,
  WINDOW_RESIZE,
  WINDOW_SCROLL
} from "shared/actions/ui-actions";

import defaultReducer from "./reducer-creators/default-reducer";

export type IUiState = Readonly<{
  size: UiSize;
  scrollTop: number;
}>;

export type UiSize = Readonly<{ innerWidth: number; innerHeight: number }>;
const initialSizeState = { innerWidth: 0, innerHeight: 0 };

const sizeReducer = (
  state: UiSize = initialSizeState,
  action: TWindowResizeAction
): UiSize =>
  defaultReducer<TWindowResizeAction, UiSize>(
    action,
    state,
    initialSizeState,
    WINDOW_RESIZE
  );

const scrollReducer = (
  state: number = 0,
  action: TWindowScrollAction
): number =>
  defaultReducer<TWindowScrollAction, number>(action, state, 0, WINDOW_SCROLL);

const uiReducer = combineReducers<IUiState>({
  size: sizeReducer,
  scrollTop: scrollReducer
});

export default uiReducer;
