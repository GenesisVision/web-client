import useApiRequest from "hooks/api-request.hook";
import DashboardBlock, {
  DashboardBlockOrientation
} from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { CurrencyEnum } from "utils/types";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";
import DashboardStatistic from "./dashboard-statistic";
import styles from "./dashboard-statistic.module.scss";

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
      <div className={styles["dashboard-statistic__container"]}>
        <DashboardStatistic
          className={styles["dashboard-statistic__data"]}
          EmptyBlock={EmptyBlock}
          currency={currency}
          renderValues={renderValues}
          loaderData={getTradingStatisticLoaderData()}
          data={data!}
        />
      </div>
    </DashboardBlock>
  );
};

const DashboardStatisticContainer = React.memo(_DashboardStatisticContainer);
export default DashboardStatisticContainer;
