import Page from "components/page/page";
import { Broker, ExchangeInfo } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CreateAccountContainer from "./components/create-account.container";

const _CreateAccountPage: React.FC<Props> = ({
  exchanges,
  brokers,
  requestBrokerName
}) => {
  const [t] = useTranslation();
  console.log(exchanges);
  return (
    <Page showTitle title={t("create-account:title")}>
      <CreateAccountContainer
        exchanges={exchanges}
        brokers={brokers}
        requestBrokerName={requestBrokerName}
      />
    </Page>
  );
};

interface Props {
  exchanges: ExchangeInfo[];
  requestBrokerName?: string;
  brokers: Broker[];
}
const CreateAccountPage = React.memo(_CreateAccountPage);
export default CreateAccountPage;
