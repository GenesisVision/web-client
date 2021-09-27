import { RowItem } from "components/row-item/row-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { DashboardTradingAsset } from "gv-api-web";
import DashboardHorizontalList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-list";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
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

const _DashboardInvestingMostProfitable: React.FC<Props> = ({
  onApply,
  data
}) => {
  return (
    <DashboardHorizontalList>
      {data.map((asset: DashboardTradingAsset) => (
        <RowItemStyled>
          <DashboardPublicCard
            withOffset={false}
            showWithdraw={false}
            showActions={false}
            updateItems={onApply}
            asset={asset}
          />
        </RowItemStyled>
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
