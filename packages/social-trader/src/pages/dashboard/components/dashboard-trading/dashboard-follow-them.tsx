import { withBlurLoader } from "decorators/with-blur-loader";
import { FollowDetailsList } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import React from "react";

const _DashboardFollowThem: React.FC<Props> = ({ data }) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: FollowDetailsList) => (
        <FollowCard follow={asset} title={""} />
      ))}
    </DashboardHorizontalList>
  );
};

interface Props {
  data: FollowDetailsList[];
}

const DashboardFollowThem = withBlurLoader(React.memo(_DashboardFollowThem));
export default DashboardFollowThem;
