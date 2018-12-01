export const CLEAR_SUFFIX = "CLEAR";
export const composeClearDataActionType = actionType =>
  `${actionType}_${CLEAR_SUFFIX}`;

const clearDataActionFactory = actionType => {
  const clearDateActionType = composeClearDataActionType(actionType);

  const clearData = () => {
    return {
      type: clearDateActionType
    };
  };

  return {
    clearData
  };
};

export default clearDataActionFactory;
