import { FiltersType } from "../components/table.types";

const FILTER_ACTION_SUFFIX = "FILTER";
export const composeFiltersActionType = (
  actionType: string,
  suffix: string = FILTER_ACTION_SUFFIX
) => `${actionType}_${suffix}`;

const tableFiltersReducer = ({
  type,
  filters = {}
}: {
  type: string;
  filters: FiltersType;
}) => {
  const initialState = { ...filters };
  const filterActionType = composeFiltersActionType(type);
  //@ts-ignore
  return (state = initialState, action) => {
    switch (action.type) {
      case filterActionType: {
        return { ...state, ...action.filters };
      }

      default:
        return state;
    }
  };
};

export default tableFiltersReducer;
