const isOpenReducer = (isOpen = false, action) => {
  if (action.type === "NOTIFICATIONS_TOGGLE") {
    return !isOpen;
  }
  return isOpen;
};

export default isOpenReducer;
