import RecommendationCard from "pages/dashboard/components/dashboard-recommendations/recommendation-card";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import React from "react";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardRecommendations: React.FC<Props> = ({ data }) => {
  return (
    <div className="dashboard-recommendations__cards">
      {data.map(asset => (
        <RecommendationCard asset={asset} title={""} />
      ))}
    </div>
  );
};

interface Props {
  data: TRecommendation[];
}

const DashboardRecommendations = withBlurLoader(
  React.memo(_DashboardRecommendations)
);
export default DashboardRecommendations;
