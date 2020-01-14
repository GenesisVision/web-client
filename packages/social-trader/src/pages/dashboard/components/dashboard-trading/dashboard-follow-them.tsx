import { withBlurLoader } from "decorators/with-blur-loader";
import { FollowDetailsListItem } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import React from "react";

const _DashboardFollowThem: React.FC<Props> = ({ data, onApply }) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: FollowDetailsListItem) => (
        <FollowCard
          key={asset.id}
          withFollowButton
          follow={asset}
          onApply={onApply}
        />
      ))}
    </DashboardHorizontalList>
  );
};

interface Props {
  onApply?: VoidFunction;
  data: FollowDetailsListItem[];
}

const DashboardFollowThem = withBlurLoader(React.memo(_DashboardFollowThem));
export default DashboardFollowThem;
