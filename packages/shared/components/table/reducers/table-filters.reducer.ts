import { AnyAction } from "redux";

import { FiltersType } from "../components/table.types";

const FILTER_ACTION_SUFFIX = "FILTER";
export const composeFiltersActionType = (
  actionType: string,
  suffix: string = FILTER_ACTION_SUFFIX
) => `${actionType}_${suffix}`;

type TableFiltersParamsType = {
  type: string;
  filters: FiltersType;
};

const tableFiltersReducer = (props: TableFiltersParamsType) => {
  const initialState = { ...props.filters };
  const filterActionType = composeFiltersActionType(props.type);
  return (state = initialState, action: AnyAction) => {
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
