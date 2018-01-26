import {
  registerActions
} from "./index";
import authService from "../../../services/authService";
jest.mock("../../utils/history");

describe("registerActions", () => {
  describe("register user", () => {
    const correctFilledUser = {
      email: "email",
      password: "password"
    };
    let dispatch, mockRegister;

    beforeEach(() => {
      dispatch = jest.fn();
      mockRegister = jest.fn(user => {
        if (
          user.username === correctFilledUser.email &&
          user.password === correctFilledUser.password
        ) {
          return Promise.resolve();
        } else {
          return Promise.reject({ message: "Register Error" });
        }
      });
      authService.register = mockRegister;
    });

    afterEach(() => {
      dispatch.mockClear();
      mockRegister.mockClear();
    });

    it("register user with correct credentials", async () => {
      await registerActions.registerUser(correctFilledUser)(dispatch);
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[0][0]).toEqual(registerRequest());
      expect(dispatch.mock.calls[1][0]).toEqual(
        registerSuccess(correctFilledUser.email)
      );
    });

    it("register user with weak password", async () => {
      await registerActions.registerUser({
        username: "test",
        password: "test"
      })(dispatch);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: "REGISTER_REQUEST" });
      expect(dispatch.mock.calls[1][0]).toEqual({
        message: "Register Error",
        type: "REGISTER_FAILURE"
      });
    });
  });
});
