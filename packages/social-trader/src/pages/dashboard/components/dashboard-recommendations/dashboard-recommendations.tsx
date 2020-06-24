import { RowItem } from "components/row-item/row-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import { TDashboardRecommendations } from "pages/dashboard/dashboard.types";
import React from "react";

const _DashboardRecommendations: React.FC<Props> = ({ data }) => {
  return (
    <DashboardHorizontalList>
      {data.map(asset => (
        <RowItem>
          <FollowCard withOffset={false} withFollowButton follow={asset} />
        </RowItem>
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
