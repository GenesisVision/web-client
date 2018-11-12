export const UPDATE_ACCOUNT_SETTINGS = "UPDATE_ACCOUNT_SETTINGS";

export const updateAccountSettings = payload => {
  return {
    type: UPDATE_ACCOUNT_SETTINGS,
    payload
  };
};
