import { withBlurLoader } from "decorators/with-blur-loader";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import RecommendationCard from "pages/dashboard/components/dashboard-recommendations/recommendation-card";
import { TDashboardRecommendations } from "pages/dashboard/dashboard.types";
import React from "react";

const _DashboardRecommendations: React.FC<Props> = ({ data: { assets } }) => {
  return (
    <DashboardHorizontalList>
      {assets.map(asset => (
        <RecommendationCard asset={asset} title={""} />
      ))}
    </DashboardHorizontalList>
  );
};

interface Props {
  data: TDashboardRecommendations;
}

const DashboardRecommendations = withBlurLoader(
  React.memo(_DashboardRecommendations)
);
export default DashboardRecommendations;
