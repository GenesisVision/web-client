export const CLEAR_SUFFIX = "CLEAR";
export const composeClearDataActionType = (actionType: string): string =>
  `${actionType}_${CLEAR_SUFFIX}`;

const clearDataActionFactory = (actionType: string) => {
  const clearDateActionType = composeClearDataActionType(actionType);

  const clearData = (): { type: string } => {
    return {
      type: clearDateActionType
    };
  };

  return {
    clearData
  } as { clearData(): { type: string } };
};

export default clearDataActionFactory;
