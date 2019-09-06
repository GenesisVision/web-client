import "./2fa.scss";

import classNames from "classnames";
import { TwoFactorStatus } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import DisableAuthContainer from "./disable-auth/disable-auth-container";
import GenerateRecoveryCode from "./google-auth/generate-recovery-codes/generate-recovery-codes";
import GoogleAuthContainer from "./google-auth/google-auth-container";

const _TwoFactor: React.FC<Props> = ({
  handleSubmit,
  handleChange,
  t,
  twoFactorAuth,
  type,
  handleClose,
  isPending
}) => (
  <div className="two-factor">
    <GVTextField
      name="2fa"
      label={t("2fa-page.type")}
      value={
        twoFactorAuth.twoFactorEnabled ? TYPE_2FA.GOOGLE : TYPE_2FA.DISABLE
      }
      onChange={handleChange}
      InputComponent={Select}
      disabled={isPending}
    >
      <option value={TYPE_2FA.DISABLE}>{t("2fa-page.none")}</option>
      <option value={TYPE_2FA.GOOGLE}>{t("2fa-page.google")}</option>
    </GVTextField>
    <GenerateRecoveryCode disabled={twoFactorAuth.twoFactorEnabled} />
    <Dialog
      className={classNames({
        "dialog--width-auto": !twoFactorAuth.twoFactorEnabled
      })}
      open={Boolean(type)}
      onClose={handleClose}
    >
      {type && type === TYPE_2FA.GOOGLE ? (
        <GoogleAuthContainer onSubmit={handleSubmit} />
      ) : (
        <DisableAuthContainer onSubmit={handleSubmit} />
      )}
    </Dialog>
  </div>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  twoFactorAuth: TwoFactorStatus;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleClose: () => void;
  isPending: boolean;
  type?: TYPE_2FA;
}

export enum TYPE_2FA {
  GOOGLE = "google",
  DISABLE = "disable"
}

const TwoFactor = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_TwoFactor);
export default TwoFactor;
