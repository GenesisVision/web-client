import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import EmailConfirmSuccess from "pages/auth/email-confirm/email-confirm-success";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { MiddlewareDispatch } from "utils/types";

import EmailConfirmFailure from "./email-confirm-failure";
import { confirmEmail } from "./service/email-confirm.service";

const _EmailConfirmContainer: React.FC<Props> = ({ userId, code }) => {
  const dispatch = useDispatch<MiddlewareDispatch>();
  const updateTokenMiddleware = () => {
    dispatch(authActions.updateTokenAction(true));
  };
  const { errorMessage, sendRequest, data } = useApiRequest({
    middleware: [updateTokenMiddleware],
    successMessage: "auth.email-confirm.success-alert-message",
    request: props => confirmEmail(props)
  });
  useEffect(() => {
    if (data) Push(DASHBOARD_ROUTE);
  }, [data]);
  useEffect(() => {
    if (userId && code) sendRequest({ userId, code });
    else Push(NOT_FOUND_PAGE_ROUTE);
  }, [userId, code]);
  return errorMessage ? (
    <EmailConfirmFailure errorMessage={errorMessage} />
  ) : data ? (
    <EmailConfirmSuccess />
  ) : null;
};

interface Props {
  userId: string;
  code: string;
}

const EmailConfirmContainer = React.memo(_EmailConfirmContainer);
export default EmailConfirmContainer;
