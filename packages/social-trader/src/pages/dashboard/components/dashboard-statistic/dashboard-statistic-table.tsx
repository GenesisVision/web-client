import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import Crashable from "decorators/crashable";
import { TDashboardEvent } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate, humanizeDate } from "utils/dates";

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

const _DashboardStatisticTable: React.FC<Props> = ({ data }) => {
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
            <TableCell>{humanizeDate(formatDate(event.date))} ago</TableCell>
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
              {event.amount && (
                <Profitability
                  value={event.amount}
                  prefix={PROFITABILITY_PREFIX.SIGN}
                >
                  {Math.abs(event.amount)} {event.currency}
                </Profitability>
              )}
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

interface Props {
  data: TDashboardEvent[];
}

const DashboardStatisticTable = React.memo(Crashable(_DashboardStatisticTable));
export default DashboardStatisticTable;
