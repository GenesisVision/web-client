import { replace } from "connected-react-router";
import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import useErrorMessage from "shared/hooks/error-message.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { MiddlewareDispatch } from "shared/utils/types";

import EmailConfirmFailure from "./email-confirm-failure";
import { confirmEmail } from "./service/email-confirm.service";

const _EmailConfirmContainer: React.FC<Props> = ({ queryParams, service }) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isPending, setIsPending, setNotPending] = useIsOpen();
  useEffect(
    () => {
      if (queryParams.userId && queryParams.code) {
        service
          .confirmEmail(queryParams.userId, queryParams.code)
          .catch(setErrorMessage)
          .then(setNotPending);
      } else service.showNotFoundPage();
    },
    [queryParams]
  );
  return (
    <EmailConfirmFailure condition={!isPending} errorMessage={errorMessage} />
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch) => ({
  service: {
    confirmEmail: (userId: string, code: string) =>
      dispatch(confirmEmail(userId, code)),
    showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
  }
});

interface Props extends OwnProps, DispatchProps {}

interface DispatchProps {
  service: {
    confirmEmail: (userId: string, code: string) => Promise<void>;
    showNotFoundPage: () => void;
  };
}

interface OwnProps {
  queryParams: IQueryParams;
}

export interface IQueryParams {
  userId: string;
  code: string;
}

const EmailConfirmContainer = compose<React.ComponentType<OwnProps>>(
  connect<null, DispatchProps, OwnProps>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_EmailConfirmContainer);
export default EmailConfirmContainer;
