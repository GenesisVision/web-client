import BrokerSelectContainer from "components/assets/broker-select/broker-select.container";
import { CreateAssetBack } from "components/assets/create-asset/create-asset-back";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Broker } from "gv-api-web";
import useTab from "hooks/tab.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";

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
      <CreateAssetBack
        condition={tab === TAB.SETTINGS}
        asset={"ACCOUNT" as ASSET}
        onApply={confirmNavigateToBroker}
      />
      <div className="create-asset__header">
        <h1>{t("create-account-page.title")}</h1>
      </div>
      <div className="create-asset__tabs">
        <GVTabs value={tab}>
          <GVTab
            value={TAB.BROKER}
            label={t("create-account-page.tabs.select-broker")}
          />
          <GVTab
            value={TAB.SETTINGS}
            label={t("create-account-page.tabs.settings")}
          />
        </GVTabs>
      </div>
      <div className="create-asset__content">
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
