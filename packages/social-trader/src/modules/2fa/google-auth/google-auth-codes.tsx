import "./google-auth.scss";

import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import CopyIcon from "components/icon/copy-icon";
import { RecoveryCode } from "gv-api-web";
import useCopy from "hooks/copy.hook";
import * as React from "react";
import { useCallback } from "react";
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
  const copy = useCopy("2fa-page.codes.copy-success");
  const onCopy = useCallback(() => {
    copy(getCodesString(codes));
  }, [codes]);
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
          <GVButton color="secondary" onClick={onCopy}>
            <>
              <CopyIcon />
              &nbsp;
              {t("buttons.copy")}
            </>
          </GVButton>
        </DialogButtons>
        <div className="dialog__info">{t("2fa-page.codes.warning")}</div>
      </DialogBottom>
    </div>
  );
};

interface Props {
  codes: RecoveryCode[];
}
const GoogleAuthCodes = React.memo(_GoogleAuthCodes);
export default GoogleAuthCodes;
