import { composeFilteringActionType } from "../helpers/filtering-helpers";

const filteringActionsFactory = actionType => {
  const filteringActionType = composeFilteringActionType(actionType);

  const updateFilter = filter => {
    return {
      type: filteringActionType,
      payload: filter
    };
  };

  return {
    updateFilter
  };
};

export default filteringActionsFactory;
