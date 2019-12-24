import { withBlurLoader } from "decorators/with-blur-loader";
import { DashboardTradingAsset } from "gv-api-web";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";

const _DashboardInvestingMostProfitable: React.FC<Props> = ({
  onApply,
  data
}) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: DashboardTradingAsset) => (
        <DashboardPublicCard
          showWithdraw={false}
          showActions={false}
          updateItems={onApply}
          asset={asset}
        />
      ))}
    </DashboardHorizontalList>
  );
};

interface Props {
  onApply: VoidFunction;
  data: DashboardTradingAsset[];
}

const DashboardInvestingMostProfitable = withBlurLoader(
  React.memo(_DashboardInvestingMostProfitable)
);
export default DashboardInvestingMostProfitable;
