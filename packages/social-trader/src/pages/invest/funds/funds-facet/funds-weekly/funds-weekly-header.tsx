import "./funds-weekly-header.scss";

import React from "react";
import { useTranslation } from "react-i18next";

export const FundsWeeklyHeader = () => {
  const [t] = useTranslation();
  return (
    <div className="funds-weekly-header">
      <h1>{t("facets.texts.challenge-title")}</h1>
      <a href="https://blog.genesis.vision/gv-funds-weekly-challenge-58e23edc876b">
        {t("facets.texts.challenge-sub-title")}
      </a>
    </div>
  );
};
