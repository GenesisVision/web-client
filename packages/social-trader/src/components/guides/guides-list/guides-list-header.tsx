import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guides-list.module.scss";

interface Props {
  name: string;
  guidesTotal: number;
  onClick: () => void;
  isVisibleList: boolean;
}

const _GuidesListHeader: React.FC<Props> = ({
  name,
  guidesTotal,
  onClick,
  isVisibleList
}) => {
  const [t] = useTranslation();
  const countsText =
    guidesTotal === 1
      ? `${guidesTotal} ${t("guides:step")}`
      : `${guidesTotal} ${t("guides:steps")}`;
  return (
    <h4 className={styles["guides-list-header"]} onClick={onClick}>
      {name}
      {!isVisibleList && (
        <span className={styles["guides-list-header__number"]}>
          {countsText}
        </span>
      )}
    </h4>
  );
};

const GuidesListHeader = React.memo(_GuidesListHeader);
export default GuidesListHeader;
