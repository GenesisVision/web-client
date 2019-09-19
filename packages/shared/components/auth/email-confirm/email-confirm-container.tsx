import { replace } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import Router from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import useApiRequest from "shared/hooks/api-request.hook";

import EmailConfirmFailure from "./email-confirm-failure";
import { confirmEmail } from "./service/email-confirm.service";

const _EmailConfirmContainer: React.FC<Props> = ({
  queryParams: { userId, code }
}) => {
  const dispatch = useDispatch();
  const { errorMessage, sendRequest, isPending } = useApiRequest({
    request: props => dispatch(confirmEmail(props))
  });
  useEffect(
    () => {
      if (userId && code) sendRequest({ userId, code });
      else Router.replace(NOT_FOUND_PAGE_ROUTE);
    },
    [userId, code]
  );
  return (
    <EmailConfirmFailure condition={!isPending} errorMessage={errorMessage} />
  );
};

interface Props {
  queryParams: IQueryParams;
}

export interface IQueryParams {
  userId: string;
  code: string;
}

const EmailConfirmContainer = React.memo(_EmailConfirmContainer);
export default EmailConfirmContainer;
