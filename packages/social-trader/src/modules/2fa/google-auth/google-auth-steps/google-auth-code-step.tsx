import classNames from "classnames";
import GVqr from "components/gv-qr/gv-qr";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import styles from "../google-auth.module.scss";

const GoogleStep2: React.FC<Props> = ({
  t,
  authenticatorUri,
  sharedKey,
  className
}) => (
  <div className={classNames(styles["google-auth__step"], className)}>
    <div className={styles["google-auth__count"]}>02</div>
    <div className={styles["google-auth__title"]}>
      {t("2fa-page.profile-page.scan-code")}
    </div>
    <div className={styles["google-auth__qr"]}>
      <GVqr value={authenticatorUri} />
    </div>
    <p className={styles["google-auth__alt-text"]}>
      {t("2fa-page.profile-page.alt-code")}
    </p>
    <div className={styles["google-auth__alt-code"]}>{sharedKey}</div>
  </div>
);

interface Props extends WithTranslation {
  authenticatorUri: string;
  sharedKey: string;
  className?: string;
}

const GoogleCodeStep = translate()(React.memo(GoogleStep2));

export default GoogleCodeStep;
