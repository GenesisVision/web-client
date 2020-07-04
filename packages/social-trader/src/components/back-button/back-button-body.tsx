import * as React from "react";
import { useTranslation } from "react-i18next";
import { Clickable } from "utils/types";

import styles from "./back-button.module.scss";

export const _BackButtonBody: React.FC<Props> = ({ onClick, backPath }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["back-button"]}>
      <div onClick={onClick} className={styles["back-button__container"]}>
        <div className={styles["back-button__back-arrow"]}>&larr;</div>
        <div className={styles["back-button__back"]}>{t("buttons.back")}</div>
      </div>
      <div className={styles["back-button__path"]}>{backPath}</div>
    </div>
  );
};

const BackButtonBody = React.memo(_BackButtonBody);
export default BackButtonBody;

interface Props extends Clickable {
  backPath?: string;
}
