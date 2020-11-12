import clsx from "clsx";
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
    <div
      className={clsx(styles["guides-list-header"], {
        [styles["guides-list-header--is-visible-list"]]: isVisibleList
      })}
      onClick={onClick}
    >
      {name}
      {!isVisibleList && (
        <span className={styles["guides-list-header__number"]}>
          {countsText}
        </span>
      )}
    </div>
  );
};

const GuidesListHeader = React.memo(_GuidesListHeader);
export default GuidesListHeader;
