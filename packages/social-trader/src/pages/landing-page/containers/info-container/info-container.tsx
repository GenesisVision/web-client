import "./info-container.scss";

import { useNetworkStatus } from "hooks/network-status";
import dynamic from "next/dynamic";
import InfoListWrapper from "pages/landing-page/components/info-list-wrapper/info-list-wrapper";
import TabControls from "pages/landing-page/components/tab-controls/tab-controls";
import { infoList, infoTabs } from "pages/landing-page/static-data/info";
import React, { useCallback, useState } from "react";

const InfoListWrapperWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/info-list-wrapper/info-list-wrapper-with-animation"
  )
);

const InfoContainer: React.FC = () => {
  const initialEffectiveConnectionType = "4g";
  const { effectiveConnectionType } = useNetworkStatus(
    initialEffectiveConnectionType
  );
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );

  const renderInfoTabs = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <InfoListWrapperWithAnimation
            currentInfoList={infoList[currentTabId]}
          />
        );
      default:
        return <InfoListWrapper currentInfoList={infoList[currentTabId]} />;
    }
  }, [effectiveConnectionType, currentTabId]);

  return (
    <div className="info-container">
      <div className="info-container__wrapper-controls">
        <TabControls
          currentTabId={currentTabId}
          tabsItems={infoTabs}
          onChange={handleChange}
          className="info-container__controls"
        />
      </div>
      {renderInfoTabs()}
    </div>
  );
};

export default InfoContainer;
