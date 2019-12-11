import "./dashboard-statistic.scss";

import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { CurrencyEnum } from "utils/types";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";
import DashboardStatistic from "./dashboard-statistic";

const _DashboardStatisticContainer: React.FC<Props> = ({
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
    <DashboardBlock
      label={label}
      all={all}
      className="dashboard-statistic__container"
    >
      <DashboardStatistic
        EmptyBlock={EmptyBlock}
        currency={currency}
        renderValues={renderValues}
        loaderData={getTradingStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

interface Props {
  EmptyBlock: React.ComponentType;
  currency: CurrencyEnum;
  renderValues: (
    statistic: TDashboardTradingStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
  label: string;
  request: (...args: any) => any;
  all?: string;
}

const DashboardStatisticContainer = React.memo(_DashboardStatisticContainer);
export default DashboardStatisticContainer;
