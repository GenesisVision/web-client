import "./info-container.scss";

import { useNetworkStatus } from "hooks/network-status";
import InfoTabs from "pages/landing-page/components/info-tabs/info-tabs";
import InfoTabsWithAnimation from "pages/landing-page/components/info-tabs/info-tabs-with-animation";
import React, { useCallback } from "react";

const InfoContainer: React.FC = () => {
  const { effectiveConnectionType = "4g" } = useNetworkStatus();
  const renderSection = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return <InfoTabs />;
      default:
        return <InfoTabs />;
    }
  }, [effectiveConnectionType]);
  return renderSection();
};

export default InfoContainer;
