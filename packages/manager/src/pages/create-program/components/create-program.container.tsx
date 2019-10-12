import { CreateAssetBack } from "components/create-asset/create-asset-back";
import { Broker } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ASSET } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import CreateProgramBrokerContainer from "./create-program-broker/create-program-broker.container";
import { CreateProgramSettingsSection } from "./create-program-settings/create-program-settings-section";

const _CreateProgramContainer: React.FC<Props> = ({ brokers }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);

  const [selectedBroker, setSelectedBroker] = useState<Broker>(brokers[0]);

  const confirmNavigateToBroker = useCallback(() => {
    setTab(null, TAB.BROKER);
  }, []);

  const navigateToSettings = useCallback(() => {
    setTab(null, TAB.SETTINGS);
  }, []);

  return (
    <div>
      <CreateAssetBack
        condition={tab === TAB.SETTINGS}
        asset={ASSET.PROGRAM}
        onApply={confirmNavigateToBroker}
      />
      <div className="create-asset__header">
        <h1>{t("manager.create-program-page.title")}</h1>
      </div>
      <div className="create-asset__tabs">
        <GVTabs value={tab}>
          <GVTab
            value={TAB.BROKER}
            label={t("manager.create-program-page.tabs.select-broker")}
          />
          <GVTab
            value={TAB.SETTINGS}
            label={t("manager.create-program-page.tabs.settings")}
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
          <CreateProgramSettingsSection broker={selectedBroker} />
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

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
