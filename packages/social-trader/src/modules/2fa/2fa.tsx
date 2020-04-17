import classNames from "classnames";
import Dialog from "components/dialog/dialog";
import GVTextField from "components/gv-text-field";
import { Row } from "components/row/row";
import Select from "components/select/select";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";

import "./2fa.scss";
import DisableAuthContainer from "./disable-auth/disable-auth-container";
import GenerateRecoveryCode from "./google-auth/generate-recovery-codes/generate-recovery-codes";
import GoogleAuthContainer from "./google-auth/google-auth-container";

export enum TYPE_2FA {
  GOOGLE = "google",
  DISABLE = "disable"
}

const _TwoFactor: React.FC<Props> = ({
  handleSubmit,
  handleChange,
  twoFactorEnabled,
  type,
  handleClose
}) => {
  const [t] = useTranslation();
  return (
    <div className="two-factor">
      <GVTextField
        name="2fa"
        label={t("2fa-page.type")}
        value={twoFactorEnabled ? TYPE_2FA.GOOGLE : TYPE_2FA.DISABLE}
        onChange={handleChange}
        InputComponent={Select}
      >
        <option value={TYPE_2FA.DISABLE}>{t("2fa-page.none")}</option>
        <option value={TYPE_2FA.GOOGLE}>{t("2fa-page.google")}</option>
      </GVTextField>
      <Row>
        <GenerateRecoveryCode disabled={twoFactorEnabled} />
      </Row>
      <Dialog
        className={classNames({
          "dialog--width-auto": !twoFactorEnabled
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
};

interface Props {
  twoFactorEnabled: boolean;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleClose: () => void;
  type?: TYPE_2FA;
}

const TwoFactor = withLoader(React.memo(_TwoFactor));
export default TwoFactor;
