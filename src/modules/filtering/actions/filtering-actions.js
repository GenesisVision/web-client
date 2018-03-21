import { composeFilteringActionType } from "../helpers/filtering-helpers";

const filteringActionsFactory = actionType => {
  const filteringActionType = composeFilteringActionType(actionType);

  const updateFiltering = filtering => {
    return {
      type: filteringActionType,
      filtering
    };
  };

  return {
    updateFiltering
  };
};

export default filteringActionsFactory;
