const openFilter = filterActionType => ({
  type: filterActionType,
  isOpen: true
});

const closeFilter = filterActionType => ({
  type: filterActionType,
  isOpen: false
});

export default {
  openFilter,
  closeFilter
};
