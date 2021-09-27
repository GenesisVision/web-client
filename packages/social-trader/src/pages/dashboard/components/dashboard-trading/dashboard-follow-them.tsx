import { RowItem } from "components/row-item/row-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { FollowDetailsListItem } from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import React from "react";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

const RowItemStyled = styled(RowItem)`
  min-width: 256px;
  width: calc(100vw - 64px);
  flex: 0 0 auto;
  ${mediaBreakpointLandscapePhone(`
    min-width: 312px;
    width: auto;
  `)};
`;

const _DashboardFollowThem: React.FC<Props> = ({ data, onApply }) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: FollowDetailsListItem) => (
        <RowItemStyled>
          <FollowCard
            withOffset={false}
            key={asset.id}
            withFollowButton
            follow={asset}
            onApply={onApply}
          />
        </RowItemStyled>
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
