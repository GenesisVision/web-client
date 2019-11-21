import "./asset-edit.scss";

import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { TwoFactorAuthenticator } from "gv-api-web";
import * as React from "react";
import { SetSubmittingType } from "utils/types";

import ConfirmForm, { IConfirmFormValues } from "./confirm-form";

const ConfirmPopup: React.FC<Props> = ({ info, edit, serverError }) => (
  <ConfirmForm
    condition={!!info}
    loader={<DialogLoader />}
    onSubmit={edit}
    serverError={serverError}
  />
);

interface Props {
  info: TwoFactorAuthenticator;
  edit: (code: IConfirmFormValues, setSubmitting: SetSubmittingType) => void;
  serverError: string;
}

export default ConfirmPopup;
