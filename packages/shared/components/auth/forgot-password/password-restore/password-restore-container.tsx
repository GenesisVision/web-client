import { replace } from "connected-react-router";
import { ResetPasswordViewModel } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import { IQueryParams } from "../../email-confirm/email-confirm-container";
import { restorePassword } from "../services/forgot-password.service";
import PasswordRestore, {
  IRestorePasswordFormValues
} from "./password-restore";

class _PasswordRestoreContainer extends React.PureComponent<Props> {
  handleSubmit = (
    formData: IRestorePasswordFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { service, queryParams } = this.props;
    const params = {
      userId: queryParams.userId,
      code: queryParams.code,
      ...formData,
      setSubmitting
    };
    service.restorePassword(params);
  };

  render() {
    const { queryParams, errorMessage, service } = this.props;
    if (!queryParams.userId || !queryParams.code) {
      service.showNotFoundPage();
    }
    return (
      <PasswordRestore error={errorMessage} onSubmit={this.handleSubmit} />
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { isPending, errorMessage } = state.passwordRestoreData.restore;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch) => ({
  service: {
    showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
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
    showNotFoundPage: () => void;
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
