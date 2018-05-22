import { WINDOW_RESIZE } from "../actions/platform-actions";

const environment = (
  state = {
    height: 0,
    width: 0
  },
  action
) => {
  switch (action.type) {
    case WINDOW_RESIZE:
      return {
        ...state,
        height: action.height,
        width: action.width
      };

    default:
      return state;
  }
};

export default environment;
