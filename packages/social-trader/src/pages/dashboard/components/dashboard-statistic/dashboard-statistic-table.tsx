import { TDashboardEvent } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { humanizeDate } from "shared/utils/dates";

const DASHBOARD_STATISTIC_COLUMNS = [
  {
    name: "data"
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
        columns={DASHBOARD_STATISTIC_COLUMNS}
        items={data}
        renderHeader={column => (
          <span>{t(`dashboard-page.statistic.table.${column.name}`)}</span>
        )}
        renderBodyRow={(event: TDashboardEvent) => (
          <TableRow stripy>
            <TableCell>
              {humanizeDate(event.data.toString(), new Date().toString())}
            </TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>
              <Profitability
                value={event.amount}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={Math.abs(event.amount)}
                  thousandSeparator={" "}
                  suffix={` ${"GVT"}`}
                  displayType="text"
                />
              </Profitability>
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

const DashboardStatisticTable = React.memo(_DashboardStatisticTable);
export default DashboardStatisticTable;
