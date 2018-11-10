import { composeFilteringActionType } from "shared/components/table/helpers/filtering.helpers";
import { composePaingActionType } from "shared/components/table/helpers/paging.helpers";
import { composeSortingActionType } from "shared/components/table/helpers/sorting.helpers";

export const tableActionsFactory = actionType => {
  const tablePagingActionType = composePaingActionType(actionType);
  const tableFilteringActionType = composeFilteringActionType(actionType);
  const tableSortingActionType = composeSortingActionType(actionType);

  const updatePaging = paging => {
    return {
      type: tablePagingActionType,
      paging
    };
  };

  const updateSorting = sorting => {
    return {
      type: tableSortingActionType,
      payload: sorting
    };
  };

  const updateFilter = filter => {
    return {
      type: tableFilteringActionType,
      payload: filter
    };
  };

  return {
    updateSorting,
    updatePaging,
    updateFilter
  };
};
