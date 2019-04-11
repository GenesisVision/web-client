import "./asset-edit.scss";

import * as React from "react";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import ConfirmForm, { IConfirmFormValues } from "./confirm-form";
import { TwoFactorAuthenticator } from "gv-api-web";
import { SetSubmittingType } from "shared/utils/types";

class ConfirmPopup extends React.PureComponent<Props> {
  render() {
    const { info, edit, serverError } = this.props;
    return info ? (
      <ConfirmForm onSubmit={edit} serverError={serverError} />
    ) : (
      <DialogLoader />
    );
  }
}

interface Props {
  info: TwoFactorAuthenticator;
  edit: (code: IConfirmFormValues, setSubmitting: SetSubmittingType) => void;
  serverError: string;
}

export default ConfirmPopup;
