import { alertMessageActions } from "./alert-message-actions";

import * as alertMessageActionTypes from "./alert-message-actions.constants";

describe("alertMessageActions", () => {
  const text = "New text";
  it("should create an action with a text about success", () => {
    const expectedAction = {
      type: alertMessageActionTypes.ALERT_MESSAGE_SUCCESS,
      className: "success",
      text
    };
    expect(alertMessageActions.success(text)).toEqual(expectedAction);
  });

  it("should create an action with a text about error", () => {
    const expectedAction = {
      type: alertMessageActionTypes.ALERT_MESSAGE_ERROR,
      className: "danger",
      text
    };
    expect(alertMessageActions.error(text)).toEqual(expectedAction);
  });

  it("should create an action with a text about warning", () => {
    const expectedAction = {
      type: alertMessageActionTypes.ALERT_MESSAGE_WARNING,
      className: "warning",
      text
    };
    expect(alertMessageActions.warning(text)).toEqual(expectedAction);
  });

  it("should create an action for removing text", () => {
    const removeAtId = 0;
    const expectedAction = {
      type: alertMessageActionTypes.ALERT_MESSAGE_REMOVE_AT,
      id: removeAtId
    };
    expect(alertMessageActions.remove(removeAtIdx)).toEqual(expectedAction);
  });

  it("should create an action for removing text", () => {
    const expectedAction = {
      type: alertMessageActionTypes.ALERT_MESSAGE_CLEAR_ALL
    };
    expect(alertMessageActions.clearAll()).toEqual(expectedAction);
  });
});
