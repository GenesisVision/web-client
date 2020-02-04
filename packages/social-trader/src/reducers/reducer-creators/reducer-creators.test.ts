import { composeClearDataActionType } from "actions/clear-data.factory";

import defaultReducer from "./default-reducer";

describe("test reducer creators", () => {
  describe("test defaultReducer", () => {
    const type = "TEST_ACTION";
    const otherType = "OTHER_ACTION";
    const clearType = composeClearDataActionType(type);
    const payload = { value: "testPayload" };
    const Action = {
      type,
      payload
    };
    const ClearAction = {
      type: clearType,
      payload
    };
    const OtherAction = {
      type: otherType,
      payload
    };
    const initialState = {
      value: ""
    };
    const state = {
      value: "testValue"
    };
    it("should be return action payload if the types match", () => {
      expect(defaultReducer(Action, state, initialState, type)).toBe(payload);
    });
    it("should be return state if the types not match", () => {
      expect(defaultReducer(OtherAction, state, initialState, type)).toBe(
        state
      );
    });
    it("should be return initialState if type is clear", () => {
      expect(defaultReducer(ClearAction, state, initialState, type)).toBe(
        initialState
      );
    });
    it("should be merge state and payload if merge is true (arrays)", () => {
      const Action = {
        type,
        payload: [4, 5, 6]
      };
      const state = [1, 2, 3];
      const initialState: any[] = [];
      expect(defaultReducer(Action, state, initialState, type, true)).toEqual([
        1,
        2,
        3,
        4,
        5,
        6
      ]);
    });
    it("should be merge state and payload if merge is true (objects)", () => {
      const Action = {
        type,
        payload: { c: 3, d: 4 }
      };
      const state = { a: 1, b: 2 };
      const initialState = {};
      expect(defaultReducer(Action, state, initialState, type, true)).toEqual({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      });
    });
    it("should be return state if merge is true and state and payload is not uniform", () => {
      const Action = {
        type,
        payload: { c: 3, d: 4 }
      };
      const state = [1, 2, 3];
      const initialState = {};
      expect(defaultReducer(Action, state, initialState, type, true)).toBe(
        state
      );
    });
  });
});
