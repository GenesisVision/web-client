import { Center } from "components/center/center";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { EVENT_PROFITABILITY_VALUES } from "components/portfolio-events-table/portfolio-events-table.constants";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import Crashable from "decorators/crashable";
import { TDashboardEvent } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./dashboard-statistic.module.scss";

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
    <div className={styles["dashboard-statistic__table-block"]}>
      <Table
        hideToolbar
        columns={DASHBOARD_STATISTIC_COLUMNS}
        items={data}
        renderHeader={column => (
          <span>{t(`dashboard-page:statistic.table.${column.name}`)}</span>
        )}
        renderBodyRow={(event: TDashboardEvent) => {
          const humanizedDate = humanizeDate(formatDate(event.date));
          if (!humanizedDate) console.log(event.date, new Date());
          return (
            <TableRow stripy>
              <TableCell>
                {humanizedDate ? <>{humanizedDate} ago</> : "Less minute ago"}
              </TableCell>
              <TableCell
                className={styles["dashboard-statistic__event-description"]}
              >
                <Center>
                  {event.assetDetails && (
                    <RowItem>
                      <PortfolioEventLogo
                        withAsset={true}
                        assetDetails={event.assetDetails}
                        icon={event.logoUrl}
                      />
                    </RowItem>
                  )}
                  <RowItem>{event.title}</RowItem>
                </Center>
              </TableCell>
              <TableCell>
                <Profitability
                  condition={!!event.amount}
                  value={EVENT_PROFITABILITY_VALUES[event.changeState]}
                  prefix={PROFITABILITY_PREFIX.SIGN}
                >
                  <NumberFormat
                    value={formatCurrencyValue(event.amount, event.currency)}
                    allowNegative={false}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={` ${event.currency}`}
                  />
                </Profitability>
              </TableCell>
            </TableRow>
          );
        }}
      />
    </div>
  );
};

interface Props {
  data: TDashboardEvent[];
}

const DashboardStatisticTable = React.memo(Crashable(_DashboardStatisticTable));
export default DashboardStatisticTable;
