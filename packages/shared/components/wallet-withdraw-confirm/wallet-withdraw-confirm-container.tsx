import { replace } from "connected-react-router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";

import { confirmWithdraw } from "./services/wallet-withdraw-confirm.services";

interface IEmailConfirmContainerProps {
  queryParams: any;
}

const _EmailConfirmContainer: React.FC<IEmailConfirmContainerProps> = ({
  queryParams
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (queryParams.requestId && queryParams.code) {
      dispatch(confirmWithdraw(queryParams.requestId, queryParams.code));
    } else {
      replace(NOT_FOUND_PAGE_ROUTE);
    }
  }, []);
  return null;
};

const EmailConfirmContainer = React.memo(_EmailConfirmContainer);
export default EmailConfirmContainer;
