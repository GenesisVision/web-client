import "./back-button.scss";

import Router from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import useHistoryContext from "shared/decorators/history-provider/use-history-context";

export const _BackButton: React.FC = () => {
  const [t] = useTranslation();
  const { from } = useHistoryContext();
  if (!from) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={() => Router.back()}
        color="secondary"
        className="back-button__container"
      >
        <>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </>
      </GVButton>
      <div className="back-button__path">{from}</div>
    </div>
  );
};

const BackButton = React.memo(_BackButton);
export default BackButton;
