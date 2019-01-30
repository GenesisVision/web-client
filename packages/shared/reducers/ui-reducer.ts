import { WINDOW_RESIZE, WINDOW_SCROLL } from "shared/actions/ui-actions";
import { DeepReadonly } from "utility-types";

export type IUiState = DeepReadonly<{
  innerWidth: number;
  innerHeight: number;
  scrollTop: number;
}>;

const initialState: IUiState = {
  innerWidth: 0,
  innerHeight: 0,
  scrollTop: 0
} as IUiState;

const uiReducer = (state: IUiState = initialState, actions: any): IUiState => {
  switch (actions.type) {
    case WINDOW_RESIZE: {
      const { innerWidth, innerHeight } = actions;
      return {
        ...state,
        innerHeight,
        innerWidth
      };
    }
    case WINDOW_SCROLL: {
      const { scrollTop } = actions;
      return {
        ...state,
        scrollTop
      };
    }
    default:
      return state;
  }
};

export default uiReducer;
