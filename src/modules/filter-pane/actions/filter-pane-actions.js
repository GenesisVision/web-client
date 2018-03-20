const openFilter = filterActionType => ({
  type: filterActionType,
  isOpen: true
});

const closeFilter = filterActionType => ({
  type: filterActionType,
  isOpen: false
});

const filterPaneActions = {
  openFilter,
  closeFilter
};

export default filterPaneActions;
