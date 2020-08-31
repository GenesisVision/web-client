import Page from "components/page/page";
import { Broker, ExchangeInfo } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CreateProgramContainer from "./components/create-program.container";

interface Props {
  exchanges: ExchangeInfo[];
  requestBrokerName?: string;
  brokers: Broker[];
}

const _CreateProgramPage: React.FC<Props> = ({
  exchanges,
  brokers,
  requestBrokerName
}) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("create-program-page:title")}>
      <CreateProgramContainer
        exchanges={exchanges}
        brokers={brokers}
        requestBrokerName={requestBrokerName}
      />
    </Page>
  );
};

const CreateProgramPage = React.memo(_CreateProgramPage);
export default CreateProgramPage;
