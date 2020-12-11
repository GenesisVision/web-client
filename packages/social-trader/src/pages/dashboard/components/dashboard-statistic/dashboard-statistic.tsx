import { detailsBlockHorizontalPaddings } from "components/details/details.constants";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { withBlurLoader } from "decorators/with-blur-loader";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardStatisticTable from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-table";
import React from "react";
import { useTranslation } from "react-i18next";
import { EVENTS_ROUTE } from "routes/dashboard.routes";
import styled from "styled-components";
import { $fontSizeCommon, $paddingXsmall } from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  EmptyBlock: React.ComponentType;
  currency: CurrencyEnum;
  data: TDashboardTradingStatistic & TDashboardInvestingStatistic;
  renderValues: (
    statistic: TDashboardTradingStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Values = styled.div`
  ${detailsBlockHorizontalPaddings}
`;

const SeeAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${$paddingXsmall}px;
  font-size: ${$fontSizeCommon}px;
`;

const _DashboardStatistic: React.FC<Props> = ({
  EmptyBlock,
  renderValues,
  data,
  currency
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { equity, events, profits, programsCount, fundsCount } = data;
  const hasNotInvesting =
    programsCount !== undefined && fundsCount !== undefined
      ? !(programsCount && fundsCount)
      : true;
  const hasNotTrading = equity !== undefined ? !equity : true;
  const hasNotAssets = hasNotInvesting && hasNotTrading;
  if (hasNotAssets) return <EmptyBlock />;
  return (
    <Container>
      <div>
        <Values>
          {renderValues(data)}
          <DashboardStatisticPeriods
            withProfitability
            currency={currency}
            data={profits}
          />
        </Values>
        <DashboardStatisticTable data={events.items} />
      </div>
      <SeeAll>
        <Link to={linkCreator(EVENTS_ROUTE)}>
          {t("dashboard-page:statistic.see-all")}
        </Link>
      </SeeAll>
    </Container>
  );
};

const DashboardStatistic = withBlurLoader(React.memo(_DashboardStatistic));
export default DashboardStatistic;
