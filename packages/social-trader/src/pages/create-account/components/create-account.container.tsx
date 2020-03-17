import { AssetTabsBlock } from "components/assets/asset-fields/asset-tabs.block";
import BrokerSelectContainer from "components/assets/broker-select/broker-select.container";
import GVTab from "components/gv-tabs/gv-tab";
import { Broker } from "gv-api-web";
import useTab from "hooks/tab.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import CreateAccountSettingsSection from "./create-account-settings/create-account-settings-section";

const _CreateAccountContainer: React.FC<Props> = ({
  brokers,
  requestBrokerName = ""
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);
  const broker = brokers.find(
    ({ name }) => name.toLowerCase() === requestBrokerName.toLowerCase()
  );
  const [selectedBroker, setSelectedBroker] = useState<Broker>(
    broker || brokers[0]
  );

  const confirmNavigateToBroker = useCallback(() => {
    setTab(null, TAB.BROKER);
  }, []);

  const navigateToSettings = useCallback(() => {
    window.scrollTo(0, 0);
    setTab(null, TAB.SETTINGS);
  }, []);

  return (
    <div>
      <AssetTabsBlock value={tab}>
        <GVTab
          onClick={confirmNavigateToBroker}
          value={TAB.BROKER}
          label={t("create-account-page.tabs.select-broker")}
        />
        <GVTab
          value={TAB.SETTINGS}
          label={t("create-account-page.tabs.settings")}
        />
      </AssetTabsBlock>
      {tab === TAB.BROKER && (
        <BrokerSelectContainer
          brokers={brokers}
          setSelectedBroker={setSelectedBroker}
          navigateToSettings={navigateToSettings}
          selectedBroker={selectedBroker}
        />
      )}
      {tab === TAB.SETTINGS && (
        <CreateAccountSettingsSection broker={selectedBroker} />
      )}
    </div>
  );
};

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

interface Props {
  requestBrokerName?: string;
  brokers: Broker[];
}

const CreateAccountContainer = React.memo(_CreateAccountContainer);
export default CreateAccountContainer;
