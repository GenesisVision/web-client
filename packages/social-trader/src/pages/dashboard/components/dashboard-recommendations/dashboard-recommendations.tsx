import { RowItem } from "components/row-item/row-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import { TDashboardRecommendations } from "pages/dashboard/dashboard.types";
import React from "react";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import styled from "styled-components";

const RowItemStyled = styled(RowItem)`
  min-width: 256px;
  width: calc(100vw - 64px);
  flex: 0 0 auto;
  ${mediaBreakpointLandscapePhone(`
    min-width: 312px;
    width: auto;
  `)};
`;

const _DashboardRecommendations: React.FC<Props> = ({ data }) => {
  return (
    <DashboardHorizontalList>
      {data.map(asset => (
        <RowItemStyled>
          <FollowCard withOffset={false} withFollowButton follow={asset} />
        </RowItemStyled>
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
