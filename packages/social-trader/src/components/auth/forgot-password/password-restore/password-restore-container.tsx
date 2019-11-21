import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import { ResetPasswordViewModel } from "gv-api-web";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "utils/types";

import { IQueryParams } from "../../email-confirm/email-confirm-container";
import { restorePassword } from "../services/forgot-password.service";
import PasswordRestore, {
  IRestorePasswordFormValues
} from "./password-restore";

const _PasswordRestoreContainer: React.FC<Props> = ({
  queryParams,
  errorMessage,
  service
}) => {
  const handleSubmit = useCallback(
    (
      formData: IRestorePasswordFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const params = {
        userId: queryParams.userId,
        code: queryParams.code,
        ...formData,
        setSubmitting
      };
      service.restorePassword(params);
    },
    [service, queryParams]
  );

  if (!queryParams.userId || !queryParams.code) {
    Push(NOT_FOUND_PAGE_ROUTE);
  }
  return <PasswordRestore error={errorMessage} onSubmit={handleSubmit} />;
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch) => ({
  service: {
    restorePassword: (
      data: ResetPasswordViewModel & { setSubmitting: SetSubmittingType }
    ) => dispatch(restorePassword(data))
  }
});

interface Props extends StateProps, OwnProps, DispatchProps {}

interface StateProps {
  isPending: boolean;
  errorMessage: string;
}

interface OwnProps {
  queryParams: IQueryParams;
}

interface DispatchProps {
  service: {
    restorePassword: (
      data: ResetPasswordViewModel & { setSubmitting: SetSubmittingType }
    ) => void;
  };
}

const PasswordRestoreContainer = React.memo(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )(_PasswordRestoreContainer)
);
export default PasswordRestoreContainer;
