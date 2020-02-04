import { alertMessageActions, IAlertAction } from "./alert-message-actions";
import { ALERT_MESSAGE } from "./alert-message-actions.constants";

describe("alertMessageActions", () => {
  const text = "New text";
  it("should create an action with a text about success", () => {
    const expectedAction: IAlertAction = {
      type: ALERT_MESSAGE.SUCCESS,
      payload: {
        className: "alert-message--success",
        text,
        isUseLocalization: false
      }
    };
    expect(alertMessageActions.success(text)).toEqual(expectedAction);
  });

  it("should create an action with a text about error", () => {
    const expectedAction: IAlertAction = {
      type: ALERT_MESSAGE.ERROR,
      payload: {
        className: "alert-message--danger",
        text,
        isUseLocalization: true
      }
    };
    expect(alertMessageActions.error(text, true)).toEqual(expectedAction);
  });

  it("should create an action with a text about warning", () => {
    const expectedAction: IAlertAction = {
      type: ALERT_MESSAGE.WARNING,
      payload: {
        className: "alert-message--warning",
        text,
        isUseLocalization: false
      }
    };
    expect(alertMessageActions.warning(text)).toEqual(expectedAction);
  });

  it("should create an action for removing text", () => {
    const id = "1";
    const expectedAction: IAlertAction = {
      type: ALERT_MESSAGE.REMOVE_AT,
      payload: { id }
    };
    expect(alertMessageActions.remove(id)).toEqual(expectedAction);
  });

  it("should create an action for clear message list", () => {
    const expectedAction: IAlertAction = {
      type: ALERT_MESSAGE.CLEAR_ALL,
      payload: {}
    };
    expect(alertMessageActions.clearAll()).toEqual(expectedAction);
  });
});
