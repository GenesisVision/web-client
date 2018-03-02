import ApimanagerApi from "gv-api-web";
import authService from "../../../services/authService";
import loginActions, { loginSuccess } from "./login-actions";

jest.mock("gv-api-web");
jest.mock("../../../utils/history");

describe("loginActions", () => {
  describe("login user", () => {
    const correctFilledUser = {
      email: "email@email.com",
      password: "password"
    };

    describe("login user with correct credentials", () => {
      let dispatch;
      let token = "tokenData";

      beforeEach(() => {
        dispatch = jest.fn();
        ApimanagerApi.mockImplementation(() => ({
          apiManagerAuthSignInPostWithHttpInfo: () => {
            return {
              data: token
            };
          }
        }));
        authService.storeToken = jest.fn(t => token);
      });
      afterEach(() => {
        dispatch.mockClear();
        authService.storeToken.mockClear();
      });

      it("call dispatch twice", async () => {
        await loginActions.loginUser(correctFilledUser, { pathname: "" })(
          dispatch
        );
        expect(dispatch.mock.calls.length).toEqual(2);
      });
      it("call save token fn", async () => {
        await loginActions.loginUser(correctFilledUser, { pathname: "" })(
          dispatch
        );
        expect(authService.storeToken.mock.calls[0][0]).toEqual(token);
      });
      it("call login success", async () => {
        await loginActions.loginUser(correctFilledUser, { pathname: "" })(
          dispatch
        );
        expect(dispatch.mock.calls[1][0]).toEqual(
          loginSuccess(correctFilledUser.email)
        );
      });
    });

    describe("login user with wrong credentials", () => {
      let dispatch;
      let token = "tokenData";

      beforeEach(() => {
        dispatch = jest.fn();
        ApimanagerApi.mockImplementation(() => ({
          apiManagerAuthSignInPostWithHttpInfo: () => {
            const error = new Error();
            error.response = {
              text: JSON.stringify({
                errors: [{ message: "wrong email/password" }]
              })
            };
            throw error;
          }
        }));
        authService.storeToken = jest.fn(t => token);
      });
      afterEach(() => {
        dispatch.mockClear();
        authService.storeToken.mockClear();
      });

      it("wrong email/password error", async () => {
        expect.assertions(1);
        try {
          await loginActions.loginUser(correctFilledUser, { pathname: "" })(
            dispatch
          );
        } catch (e) {
          const { responseError } = e;
          expect(responseError.errors[0].message).toEqual(
            "wrong email/password"
          );
        }
      });
    });

    describe("server error", () => {});
  });
});
