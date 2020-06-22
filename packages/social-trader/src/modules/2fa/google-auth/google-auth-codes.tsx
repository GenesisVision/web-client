import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import { RecoveryCode } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./google-auth.module.scss";

const CodeItem: React.FC<{ code: string }> = React.memo(({ code }) => (
  <div className={styles["codes__item"]} key={code}>
    {code}
  </div>
));

const CodeList: React.FC<{ codes: RecoveryCode[] }> = React.memo(
  ({ codes }) => (
    <Row wrap className={styles["codes__list"]}>
      {codes.map(code => (
        <CodeItem code={code.code} />
      ))}
    </Row>
  )
);

const getCodesString = (codes: RecoveryCode[]): string =>
  codes.map(code => code.code).join("\n");

const _GoogleAuthCodes: React.FC<Props> = ({ codes }) => {
  const [t] = useTranslation();
  return (
    <div className={styles["recovery-codes-container"]}>
      <DialogTop title={t("profile-page:2fa-page.codes.title")} />
      <DialogBottom>
        <Row>{t("profile-page:2fa-page.codes.recovery_codes")}</Row>
        <Row>{t("profile-page:2fa-page.codes.successfully")}</Row>
        <CodeList codes={codes} />
        <DialogButtons>
          <CopyButton wide value={getCodesString(codes)} />
        </DialogButtons>
        <DialogInfo>{t("profile-page:2fa-page.codes.warning")}</DialogInfo>
      </DialogBottom>
    </div>
  );
};

interface Props {
  codes: RecoveryCode[];
}
const GoogleAuthCodes = React.memo(_GoogleAuthCodes);
export default GoogleAuthCodes;
