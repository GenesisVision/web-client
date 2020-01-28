import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";
import BrokersContainer from "routes/ssr/landing-page/containers/brokers-container/brokers-container";
import {
  brokersInfo,
  brokersTabs
} from "routes/ssr/landing-page/static-data/brokers";

const _TradePage: React.FC<Props> = ({}) => {
  const [t] = useTranslation();
  const title = t("trade.title");
  return (
    <Page
      description={"Information about trade brokers"}
      showTitle
      title={title}
    >
      <BrokersContainer
        darkTheme
        brokersInfo={brokersInfo}
        brokersTabs={brokersTabs}
        title={""}
      />
    </Page>
  );
};

interface Props {}

export const TradePage = React.memo(_TradePage);
