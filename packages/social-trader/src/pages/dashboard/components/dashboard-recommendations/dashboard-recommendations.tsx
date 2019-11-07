import RecommendationCard from "pages/dashboard/components/dashboard-recommendations/recommendation-card";
import { TDashboardRecommendations } from "pages/dashboard/dashboard.types";
import React from "react";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardRecommendations: React.FC<Props> = ({ data: { assets } }) => {
  return (
    <div className="dashboard-recommendations__cards">
      {assets.map(asset => (
        <RecommendationCard asset={asset} title={""} />
      ))}
    </div>
  );
};

interface Props {
  data: TDashboardRecommendations;
}

const DashboardRecommendations = withBlurLoader(
  React.memo(_DashboardRecommendations)
);
export default DashboardRecommendations;
