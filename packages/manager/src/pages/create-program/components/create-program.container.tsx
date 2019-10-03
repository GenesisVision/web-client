import { CreateAssetBack } from "components/create-asset/create-asset-back";
import { Broker } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ASSET } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import CreateProgramBroker from "./create-program-broker/create-program-broker";
import { CreateProgramSettingsSection } from "./create-program-settings/create-program-settings-section";

const _CreateProgramContainer: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);

  const [selectedBroker, setSelectedBroker] = useState<Broker | undefined>(
    undefined
  );

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
      <div className="create-program-page__header">
        <h1>{t("manager.create-program-page.title")}</h1>
      </div>
      <div className="create-program-page__tabs">
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
      {tab === TAB.BROKER && (
        <CreateProgramBroker
          setSelectedBroker={setSelectedBroker}
          navigateToSettings={navigateToSettings}
          selectedBroker={selectedBroker}
        />
      )}
      {tab === TAB.SETTINGS && (
        <CreateProgramSettingsSection broker={selectedBroker!} />
      )}
    </div>
  );
};

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
