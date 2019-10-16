import {
  alertMessageActions,
  IAlertAction
} from "../actions/alert-message-actions";
import alertMessagesReducer, {
  AlertMessagesState
} from "./alert-message-reducers";

jest.mock("uuid", () => {
  return {
    v4: () => "3"
  };
});

const text = "New text";

const getAlert = (
  className: string = "alert-message--success",
  id: string = "3"
) => ({
  id,
  text,
  className,
  isUseLocalization: false
});

describe("alertMessageReducer", () => {
  it("should return the initial state", () => {
    const expectedInitialState = [] as AlertMessagesState;
    expect(alertMessagesReducer(undefined, {} as IAlertAction)).toEqual(
      expectedInitialState
    );
  });

  describe("handle actions with empty state", () => {
    it("add text about success", () => {
      const state = alertMessagesReducer(
        undefined,
        alertMessageActions.success(text)
      );
      expect(state).toEqual([getAlert("alert-message--success")]);
    });

    it("add text about warning", () => {
      const state = alertMessagesReducer(
        undefined,
        alertMessageActions.warning(text)
      );
      expect(state).toEqual([getAlert("alert-message--warning")]);
    });

    it("add text about error", () => {
      const state = alertMessagesReducer(
        undefined,
        alertMessageActions.error(text)
      );
      expect(state).toEqual([getAlert("alert-message--danger")]);
    });
  });

  describe("handle action with existing state", () => {
    describe("add text about success", () => {
      it("should exist text about success", () => {
        const state = alertMessagesReducer(
          [getAlert(undefined, "1")],
          alertMessageActions.success(text)
        );
        expect(state[1]).toEqual(getAlert(undefined, "3"));
      });
    });

    describe("Length always should be three", () => {
      const newState = alertMessagesReducer(
        [
          getAlert(undefined, "0"),
          getAlert(undefined, "1"),
          getAlert(undefined, "2")
        ],
        alertMessageActions.success(text)
      );
      it("should update first element", () => {
        expect(newState[0]).toEqual(getAlert(undefined, "1"));
      });
      it("should update last element", () => {
        expect(newState[2]).toEqual(getAlert(undefined, "3"));
      });
      it("should reduce the length", () => {
        expect(newState).toHaveLength(3);
      });
    });

    describe("remove first text", () => {
      const newState = alertMessagesReducer(
        [getAlert(undefined, "1"), getAlert(undefined, "2")],
        alertMessageActions.remove("1")
      );
      it("should update first element", () => {
        expect(newState[0]).toEqual(getAlert(undefined, "2"));
      });
      it("should reduce the length", () => {
        expect(newState).toHaveLength(1);
      });
    });

    describe("clear all texts", () => {
      const newState = alertMessagesReducer(
        [getAlert(undefined, "1"), getAlert(undefined, "2")],
        alertMessageActions.clearAll()
      );
      it("should be empty", () => {
        expect(newState).toHaveLength(0);
      });
    });
  });
});
