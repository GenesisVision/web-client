import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import {
  ITerminalContainerProps,
  TerminalContainer
} from "pages/trade/binance-trade-page/trading/terminal.container";
import React from "react";
import { useTranslation } from "react-i18next";

const _TerminalPage: React.FC<ITerminalContainerProps> = props => {
  const [t] = useTranslation();
  const title = t("Trading terminal");

  return (
    <PageSeoWrapper title={title}>
      <TerminalContainer {...props} />
    </PageSeoWrapper>
  );
};

export const TerminalPage = React.memo(_TerminalPage);
