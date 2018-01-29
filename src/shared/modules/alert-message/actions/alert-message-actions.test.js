import { alertMessageActions, alertMessageActionTypes } from "./alert-message-actions"

describe('alertMessageActions', () => {
  const text = 'New text';
  it('should create an action with a text about success', () => {
    const expectedAction = {
      type: alertMessageActionTypes.success,
      className: 'success',
      text
    };
    expect(alertMessageActions.success(text)).toEqual(expectedAction)
  });

  it('should create an action with a text about error', () => {
    const expectedAction = {
      type: alertMessageActionTypes.error,
      className: 'danger',
      text
    };
    expect(alertMessageActions.error(text)).toEqual(expectedAction)
  });

  it('should create an action with a text about warning', () => {
    const expectedAction = {
      type: alertMessageActionTypes.warning,
      className: 'warning',
      text
    };
    expect(alertMessageActions.warning(text)).toEqual(expectedAction)
  });

  it('should create an action for removing text', () => {
    const removeAtIdx = 0;
    const expectedAction = {
      type: alertMessageActionTypes.removeAt,
      idx: removeAtIdx
    };
    expect(alertMessageActions.removeAt(removeAtIdx)).toEqual(expectedAction)
  });

  it('should create an action for removing text', () => {
    const expectedAction = {
      type: alertMessageActionTypes.clearAll
    };
    expect(alertMessageActions.clearAll()).toEqual(expectedAction)
  });
});
