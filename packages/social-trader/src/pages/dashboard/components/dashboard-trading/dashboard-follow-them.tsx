import { withBlurLoader } from "decorators/with-blur-loader";
import { FollowDetailsListItem } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import React from "react";

const _DashboardFollowThem: React.FC<Props> = ({ data }) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: FollowDetailsListItem) => (
        <FollowCard withFollowButton follow={asset} title={""} />
      ))}
    </DashboardHorizontalList>
  );
};

interface Props {
  data: FollowDetailsListItem[];
}

const DashboardFollowThem = withBlurLoader(React.memo(_DashboardFollowThem));
export default DashboardFollowThem;
