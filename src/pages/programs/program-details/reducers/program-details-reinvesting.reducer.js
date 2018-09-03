import { PROGRAM_REINVEST } from "modules/program-reinvesting/actions/program-reinvesting.actions";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";

const programDetailsReinvestingReducer = (state, action) => {
  switch (action.type) {
    case `${PROGRAM_REINVEST}_${REQUEST_SUFFIX}`: {
      return {
        ...state,
        data: {
          ...state.data,
          isReinvesting: action.meta.isReinvesting
        }
      };
    }
    case `${PROGRAM_REINVEST}_${FAILURE_SUFFIX}`: {
      return {
        ...state,
        data: {
          ...state.data,
          isReinvesting: !action.meta.isReinvesting
        }
      };
    }
    default:
      return state;
  }
};

export default programDetailsReinvestingReducer;
