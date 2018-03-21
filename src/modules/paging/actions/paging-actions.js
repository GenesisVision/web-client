import { composePaingActionType } from "../helpers/paging-helpers";

const pagingActionsFactory = actionType => {
  const pagingActionType = composePaingActionType(actionType);

  const updatePaging = paging => {
    return {
      type: pagingActionType,
      paging
    };
  };

  return {
    updatePaging
  };
};

export default pagingActionsFactory;
