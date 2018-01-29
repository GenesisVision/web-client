import alertMessagesReducer from "./alert-message-reducers"
import { alertMessageActions } from "../actions/alert-message-actions"

describe('alertMessageReducer', () => {
  const text = 'New text';

  it('should return the initial state', () => {
    const expectedInitialState = [];
    expect(alertMessagesReducer(undefined, {})).toEqual(expectedInitialState)
  });

  describe('handle actions with empty state', () => {
    const initialState = undefined;
    describe('add text about success', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.success(text));
      it('should exist text about success', () => {
        expect(newState)
          .toEqual([{
            text: text,
            className: 'success'
          }]);
      });
    });

    describe('add text about success', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.warning(text));
      it('should exist text about warning', () => {
        expect(newState)
          .toEqual([{
            text: text,
            className: 'warning'
          }]);
      });
    });

    describe('add text about error', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.error(text));
      it('should exist text about error', () => {
        expect(newState)
          .toEqual([{
            text: text,
            className: 'danger'
          }]);
      });
    });

    describe('remove text with index equals 0', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.removeAt(0));
      it('should be empty array', () => {
        expect(newState).toEqual([]);
      });
    });


    describe('remove all texts', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.clearAll());
      it('should be empty array', () => {
        expect(newState).toEqual([]);
      });
    });
  });

  describe('handle action with existing state', () => {
    const initialState = [
      {
        text: 'success text',
        className: 'success'
      },
      {
        text: 'error text',
        className: 'danger'
      }
    ];

    describe('add text about success', () => {
      it('should exist text about success', () => {
        const newState = alertMessagesReducer(initialState, alertMessageActions.success(text));
        expect(newState[2]).toEqual({
          text,
          className: 'success'
        });
      });
    });

    describe('remove first text', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.removeAt(0));
      it('should update first element', () => {
        expect(newState[0]).toEqual(initialState[1]);
      });
      it('should reduce the lenght', () => {
        expect(newState.length).toEqual(1);
      });
    });

    describe('clear all texts', () => {
      const newState = alertMessagesReducer(initialState, alertMessageActions.clearAll(1));
      it('should be empty', () => {
        expect(newState.length).toEqual(0);
      });
    });
  });
});
