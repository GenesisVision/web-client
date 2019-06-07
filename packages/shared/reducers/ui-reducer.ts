import { combineReducers } from "redux";
import { TWindowResizeAction, TWindowScrollAction, WINDOW_RESIZE, WINDOW_SCROLL } from "shared/actions/ui-actions";

export type IUiState = Readonly<{
  size: UiSize;
  scrollTop: number;
}>;

export type UiSize = Readonly<{ innerWidth: number; innerHeight: number }>;
const initialSizeState = { innerWidth: 0, innerHeight: 0 };


const sizeReducer = (
  state: UiSize = initialSizeState,
  action: TWindowResizeAction
): UiSize => {
  switch (action.type) {
    case WINDOW_RESIZE: {
      const { innerWidth, innerHeight } = action.payload;
      return { innerHeight, innerWidth };
    }
    default:
      return state;
  }
};

const scrollReducer = (
  state: number = 0,
  action: TWindowScrollAction
): number => {
  switch (action.type) {
    case WINDOW_SCROLL: {
      return action.payload;
    }
    default:
      return state;
  }
};

const uiReducer = combineReducers<IUiState>({
  size: sizeReducer,
  scrollTop: scrollReducer
});

export default uiReducer;
