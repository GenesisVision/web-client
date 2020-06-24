import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds-weekly-header.module.scss";

export const FundsWeeklyHeader = () => {
  const [t] = useTranslation();
  return (
    <div className={styles["funds-weekly-header"]}>
      <h1>{t("facets.texts.challenge-title")}</h1>
      <a href="https://blog.genesis.vision/gv-funds-weekly-challenge-58e23edc876b">
        {t("facets.texts.challenge-sub-title")}
      </a>
    </div>
  );
};
