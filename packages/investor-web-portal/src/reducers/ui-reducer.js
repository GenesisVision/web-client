import { WINDOW_RESIZE, WINDOW_SCROLL } from "shared/actions/ui-actions";

const initialState = {
  innerWidth: 0,
  innerHeight: 0,
  scrollTop: 0
};

const uiReducer = (state = initialState, actions) => {
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
