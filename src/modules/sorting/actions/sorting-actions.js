import { composeSortingActionType } from "../helpers/sorting-helpers";

const sortingActionsFactory = actionType => {
  const sortingActionType = composeSortingActionType(actionType);

  const updateSorting = value => {
    return {
      type: sortingActionType,
      payload: value
    };
  };

  return {
    updateSorting
  };
};

export default sortingActionsFactory;
