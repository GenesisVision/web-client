import "./back-button.scss";

import useHistoryContext from "decorators/history-provider/use-history-context";
import Router from "next/router";
import React from "react";

import BackButtonBody from "./back-button-body";

export const _BackButton: React.FC = () => {
  const { from } = useHistoryContext();
  if (!from) return null;
  return (
    <div className="page__back">
      <BackButtonBody onClick={() => Router.back()} backPath={from} />
    </div>
  );
};

const BackButton = React.memo(_BackButton);
export default BackButton;
