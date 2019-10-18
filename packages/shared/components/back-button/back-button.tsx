import "./back-button.scss";

import Router from "next/router";
import React from "react";
import useHistoryContext from "shared/decorators/history-provider/use-history-context";

import BackButtonBody from "./back-button-body";

export const _BackButton: React.FC = () => {
  const { from } = useHistoryContext();
  if (!from) return null;
  return <BackButtonBody onClick={() => Router.back()} backPath={from} />;
};

const BackButton = React.memo(_BackButton);
export default BackButton;
