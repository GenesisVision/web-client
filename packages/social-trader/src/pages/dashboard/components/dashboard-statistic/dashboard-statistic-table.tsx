import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { TDashboardEvent } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "shared/utils/dates";
import { CurrencyEnum } from "utils/types";

const DASHBOARD_STATISTIC_COLUMNS = [
  {
    name: "date"
  },
  {
    name: "description"
  },
  {
    name: "amount"
  }
];

const _DashboardStatisticTable: React.FC<Props> = ({ data, currency }) => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-statistic__table-block">
      <Table
        hideToolbar
        columns={DASHBOARD_STATISTIC_COLUMNS}
        items={data}
        renderHeader={column => (
          <span>{t(`dashboard-page.statistic.table.${column.name}`)}</span>
        )}
        renderBodyRow={(event: TDashboardEvent) => (
          <TableRow stripy>
            <TableCell>{formatDate(event.date)}</TableCell>
            <TableCell>
              <div className="dashboard-statistic__event-description">
                {event.assetDetails && (
                  <PortfolioEventLogo
                    withAsset={true}
                    assetDetails={event.assetDetails}
                    icon={event.icon}
                  />
                )}
                <div>{event.title}</div>
              </div>
            </TableCell>
            <TableCell>
              <Profitability
                value={event.amount}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                {Math.abs(event.amount)}
              </Profitability>
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardEvent[];
}

const DashboardStatisticTable = React.memo(_DashboardStatisticTable);
export default DashboardStatisticTable;
