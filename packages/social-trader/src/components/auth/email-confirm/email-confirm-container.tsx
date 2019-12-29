import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import EmailConfirmFailure from "./email-confirm-failure";
import { confirmEmail } from "./service/email-confirm.service";

const _EmailConfirmContainer: React.FC<Props> = ({ userId, code }) => {
  const dispatch = useDispatch();
  const { errorMessage, sendRequest } = useApiRequest({
    successMessage: "auth.email-confirm.success-alert-message",
    request: props => dispatch(confirmEmail(props))
  });
  useEffect(() => {
    if (userId && code) sendRequest({ userId, code });
    else Push(NOT_FOUND_PAGE_ROUTE);
  }, [userId, code]);
  return (
    <EmailConfirmFailure
      condition={!!errorMessage}
      errorMessage={errorMessage}
    />
  );
};

interface Props {
  userId: string;
  code: string;
}

const EmailConfirmContainer = React.memo(_EmailConfirmContainer);
export default EmailConfirmContainer;
