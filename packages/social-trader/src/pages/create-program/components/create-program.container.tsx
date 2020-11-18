import BrokerSelectContainer from "components/assets/broker-select/broker-select.container";
import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { Broker, ExchangeInfo } from "gv-api-web";
import useTab from "hooks/tab.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import CreateProgramSettingsSection from "./create-program-settings/create-program-settings-section";

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

interface Props {
  exchanges: ExchangeInfo[];
  requestBrokerName?: string;
  brokers: Broker[];
}

const _CreateProgramContainer: React.FC<Props> = ({
  exchanges,
  brokers,
  requestBrokerName = ""
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);
  const broker = [...brokers, ...exchanges].find(
    ({ name }) => name.toLowerCase() === requestBrokerName.toLowerCase()
  );
  const [selectedBroker, setSelectedBroker] = useState<BrokerCardType>(
    broker || brokers[0]
  );

  const confirmNavigateToBroker = useCallback(() => {
    setTab(null, TAB.BROKER);
  }, []);

  const navigateToSettings = useCallback(() => {
    window.scrollTo(0, 0);
    setTab(null, TAB.SETTINGS);
  }, []);

  const isBroker = "leverageMin" in selectedBroker;
  return (
    <div>
      <GVTabs value={tab}>
        <GVTab
          onClick={confirmNavigateToBroker}
          value={TAB.BROKER}
          label={t("create-account:tabs.select-broker")}
        />
        <GVTab value={TAB.SETTINGS} label={t("create-account:tabs.settings")} />
      </GVTabs>
      <Row size={"large"}>
        {tab === TAB.BROKER && (
          <BrokerSelectContainer
            brokers={[...exchanges, ...brokers]}
            setSelectedBroker={setSelectedBroker}
            navigateToSettings={navigateToSettings}
            selectedBroker={selectedBroker}
          />
        )}
        {tab === TAB.SETTINGS && isBroker && (
          <CreateProgramSettingsSection broker={selectedBroker as Broker} />
        )}
      </Row>
    </div>
  );
};

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
