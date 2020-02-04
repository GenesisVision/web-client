import "./google-auth.scss";

import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import { RecoveryCode } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import * as React from "react";
import { useTranslation } from "react-i18next";

const CodeItem: React.FC<{ code: string }> = React.memo(({ code }) => (
  <div className="codes__item" key={code}>
    {code}
  </div>
));

const CodeList: React.FC<{ codes: RecoveryCode[] }> = React.memo(
  ({ codes }) => (
    <div className="codes__list">
      {codes.map(code => (
        <CodeItem code={code.code} />
      ))}
    </div>
  )
);

const getCodesString = (codes: RecoveryCode[]): string =>
  codes.map(code => code.code).join("\n");

const _GoogleAuthCodes: React.FC<Props> = ({ codes }) => {
  const [t] = useTranslation();
  return (
    <div className="recovery-codes-container">
      <DialogTop title={t("2fa-page.codes.title")} />
      <DialogBottom>
        <div className="dialog__text">
          <p>{t("2fa-page.codes.successfully")}</p>
          <p>{t("2fa-page.codes.recovery_codes")}</p>
        </div>
        <CodeList codes={codes} />
        <DialogButtons>
          <CopyButton
            wide
            value={getCodesString(codes)}
            successMessage={"2fa-page.codes.copy-success"}
          />
        </DialogButtons>
        <DialogInfo>{t("2fa-page.codes.warning")}</DialogInfo>
      </DialogBottom>
    </div>
  );
};

interface Props {
  codes: RecoveryCode[];
}
const GoogleAuthCodes = React.memo(_GoogleAuthCodes);
export default GoogleAuthCodes;
