import { useNetworkStatus } from "hooks/network-status";
import dynamic from "next/dynamic";
import AdvantagesSection from "pages/landing-page/components/advantages-section/advantages-section";
import React, { useCallback } from "react";

const AdvantagesSectionWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/advantages-section/advantages-section-with-animation"
  )
);

const AdvantagesContainer: React.FC = () => {
  const { effectiveConnectionType = "4g" } = useNetworkStatus();
  const renderSection = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return <AdvantagesSectionWithAnimation />;
      default:
        return <AdvantagesSection />;
    }
  }, [effectiveConnectionType]);
  return renderSection();
};

export default AdvantagesContainer;
