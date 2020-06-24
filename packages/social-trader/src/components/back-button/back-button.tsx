import { Row } from "components/row/row";
import useHistoryContext from "decorators/history-provider/use-history-context";
import Router from "next/router";
import React from "react";

import BackButtonBody from "./back-button-body";

export const _BackButton: React.FC = () => {
  const { from } = useHistoryContext();
  if (!from) return null;
  return (
    <Row>
      <BackButtonBody onClick={() => Router.back()} backPath={from} />
    </Row>
  );
};

const BackButton = React.memo(_BackButton);
export default BackButton;
