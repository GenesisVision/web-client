import { SUCCESS_SUFFIX } from "../../../shared/reducers/api-reducer/api-reducer";
import { PROGRAMS_FAVORITE } from "../actions/programs-actions.constants";

function data(state, action) {
  switch (action.type) {
    case `${PROGRAMS_FAVORITE}_${SUCCESS_SUFFIX}`:
      return {
        ...state,
        data: {
          ...state.data,
          investmentPrograms: state.data.investmentPrograms.map(program => {
            if (program.id === action.payload.id) {
              return {
                ...program,
                isFavorite: !program.isFavorite
              };
            }
            return program;
          })
        }
      };
    default:
      return state;
  }
}

export default data;
