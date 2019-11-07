import { CreateAssetBack } from "components/create-asset/create-asset-back";
import { Broker } from "gv-api-web";
import CreateProgramBrokerContainer from "pages/create-program/components/create-program-broker/create-program-broker.container";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ASSET } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import { CreateAccountSettingsSection } from "./create-account-settings/create-program-settings-section";

const _CreateAccountContainer: React.FC<Props> = ({ brokers }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);

  const [selectedBroker, setSelectedBroker] = useState<Broker>(brokers[0]);

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
          <CreateProgramBrokerContainer
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
  brokers: Broker[];
}

const CreateAccountContainer = React.memo(_CreateAccountContainer);
export default CreateAccountContainer;
