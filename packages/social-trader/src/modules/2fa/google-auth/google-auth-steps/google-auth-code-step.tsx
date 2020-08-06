import clsx from "clsx";
import GVqr from "components/gv-qr/gv-qr";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "../google-auth.module.scss";

interface Props {
  authenticatorUri: string;
  sharedKey: string;
  className?: string;
}

const GoogleStep2: React.FC<Props> = ({
  authenticatorUri,
  sharedKey,
  className
}) => {
  const [t] = useTranslation();
  return (
    <div className={clsx(styles["google-auth__step"], className)}>
      <div className={styles["google-auth__count"]}>02</div>
      <div className={styles["google-auth__title"]}>
        {t("profile-page:2fa-page.scan-code")}
      </div>
      <div className={styles["google-auth__qr"]}>
        <GVqr value={authenticatorUri} />
      </div>
      <p className={styles["google-auth__alt-text"]}>
        {t("profile-page:2fa-page.alt-code")}
      </p>
      <div className={styles["google-auth__alt-code"]}>{sharedKey}</div>
    </div>
  );
};

const GoogleCodeStep = React.memo(GoogleStep2);
export default GoogleCodeStep;
