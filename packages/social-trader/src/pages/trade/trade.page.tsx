import Page from "components/page/page";
import BrokersContainer from "pages/landing-page/containers/brokers-container/brokers-container";
import {
  brokersInfo,
  brokersTabs
} from "pages/landing-page/static-data/brokers";
import React from "react";
import { useTranslation } from "react-i18next";

const _TradePage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("trade.title");
  return (
    <Page description={"Information about trade brokers"} title={title}>
      <BrokersContainer
        darkTheme
        brokersInfo={brokersInfo}
        brokersTabs={brokersTabs}
        title={""}
      />
    </Page>
  );
};

export const TradePage = React.memo(_TradePage);
