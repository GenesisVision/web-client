import { composeFilterPaneActionType } from "../helpers/filter-pane-helpers";

const filterPaneActionsFactory = actionType => {
  const filterPaneActionType = composeFilterPaneActionType(actionType);

  const openFilter = () => ({
    type: filterPaneActionType,
    isOpen: true
  });

  const closeFilter = () => ({
    type: filterPaneActionType,
    isOpen: false
  });

  return {
    openFilter,
    closeFilter
  };
};

export default filterPaneActionsFactory;
