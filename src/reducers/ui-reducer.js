import { WINDOW_RESIZE } from "actions/ui-actions";

const initialState = {
  innerWidth: 0,
  innerHeight: 0
};

const uiReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case WINDOW_RESIZE: {
      const { innerWidth, innerHeight } = actions;
      return {
        innerHeight,
        innerWidth
      };
    }
    default:
      return state;
  }
};

export default uiReducer;
