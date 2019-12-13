import "./dashboard-statistic.scss";

import Link from "components/link/link";
import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { useTranslation } from "react-i18next";
import { EVENTS_ROUTE } from "routes/dashboard.routes";
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
  const [t] = useTranslation();
  return (
    <DashboardBlock
      label={label}
      all={all}
      className="dashboard-statistic__container"
    >
      <div className="dashboard-statistic__data">
        <DashboardStatistic
          EmptyBlock={EmptyBlock}
          currency={currency}
          renderValues={renderValues}
          loaderData={getTradingStatisticLoaderData()}
          data={data!}
        />
      </div>
      <div className="dashboard-statistic__see-all">
        <Link to={EVENTS_ROUTE}>{t("dashboard-page.statistic.see-all")}</Link>
      </div>
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
