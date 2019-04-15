import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import GoogleAuthCodes from "../google-auth-codes";
import GenerateRecoveryWithFormik from "./generate-recovery-form";
import { PasswordModel, RecoveryCodesViewModel } from "gv-api-web";
import { SetSubmittingType } from "shared/utils/types";

class GenerateRecoveryCode extends React.PureComponent<Props, State> {
  state = {
    isOpenPopup: false,
    data: undefined,
    errorMessage: undefined
  };
  handleClick = () => {
    this.setState({ isOpenPopup: true });
  };
  handleClose = () => {
    this.setState({ isOpenPopup: false, data: undefined });
  };
  handleSubmit = (values: PasswordModel, setSubmitting: SetSubmittingType) => {
    authApi
      .v10Auth2faRecoverycodesNewPost(authService.getAuthArg(), {
        model: values
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        this.setState({ errorMessage: err.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const { disabled, t } = this.props;
    const { isOpenPopup, data, errorMessage } = this.state;
    if (!disabled) return null;
    return (
      <div className="generate-recovery-codes">
        <GVButton variant="text" type="button" onClick={this.handleClick}>
          {t("2fa-page.codes.generate-recovery-codes")}
        </GVButton>
        <Dialog open={isOpenPopup} onClose={this.handleClose}>
          {data ? (
            <GoogleAuthCodes codes={(data as RecoveryCodesViewModel).codes} />
          ) : (
            <GenerateRecoveryWithFormik
              onSubmit={this.handleSubmit}
              errorMessage={errorMessage}
            />
          )}
        </Dialog>
      </div>
    );
  }
}

interface Props extends InjectedTranslateProps {
  disabled: boolean;
}
interface State {
  isOpenPopup: boolean;
  data?: RecoveryCodesViewModel;
  errorMessage?: string;
}

export default translate()(GenerateRecoveryCode);
