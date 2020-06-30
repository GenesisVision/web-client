import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import { AdvantagesListContainer } from "pages/landing-page/components/advantages-section/advantages.blocks";
import React, { useCallback } from "react";

const AdvantagesSectionWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/advantages-section/advantages-section-with-animation"
  )
);

const AdvantagesContainer: React.FC = () => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const renderSection = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return <AdvantagesSectionWithAnimation />;
      default:
        return <AdvantagesListContainer />;
    }
  }, [effectiveConnectionType]);
  return renderSection();
};

export default AdvantagesContainer;
