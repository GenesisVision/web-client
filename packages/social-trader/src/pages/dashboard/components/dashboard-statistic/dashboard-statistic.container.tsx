import useApiRequest from "hooks/api-request.hook";
import DashboardBlock, {
  DashboardBlockOrientation
} from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import styled from "styled-components";
import { CurrencyEnum } from "utils/types";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";
import DashboardStatistic from "./dashboard-statistic";

interface Props {
  orientation?: DashboardBlockOrientation;
  EmptyBlock: React.ComponentType;
  currency: CurrencyEnum;
  renderValues: (
    statistic: TDashboardTradingStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
  label: string;
  request: (...args: any) => any;
  all?: string;
}

const StyledDashboardStatistic = styled(DashboardStatistic)`
  height: 100%;
`;

const _DashboardStatisticContainer: React.FC<Props> = ({
  orientation,
  EmptyBlock,
  currency,
  label,
  request,
  renderValues,
  all
}) => {
  const { data } = useApiRequest<
    TDashboardTradingStatistic & TDashboardInvestingStatistic
  >({
    request,
    fetchOnMount: true,
    fetchOnMountData: { currency }
  });
  return (
    <DashboardBlock orientation={orientation} label={label} all={all}>
      <StyledDashboardStatistic
        EmptyBlock={EmptyBlock}
        currency={currency}
        renderValues={renderValues}
        loaderData={getTradingStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardStatisticContainer = React.memo(_DashboardStatisticContainer);
export default DashboardStatisticContainer;
