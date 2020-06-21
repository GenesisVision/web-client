import classNames from "classnames";
import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../../program-details.constants";
import DownloadButtonToolbarAuth from "../download-button-toolbar/download-button-toolbar-auth";
import ProgramFinancialStatisticRow from "./program-financial-statistic-row";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  getItems,
  dataSelector,
  showCommissionRebateSometime,
  currency,
  id,
  title
}) => {
  const columns = showCommissionRebateSometime
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const [t] = useTranslation();
  const renderCell = (name: string) => (
    <span
      className={classNames(
        styles["details-trades__head-cell"],
        styles[`program-details-trades__cell--${name}`]
      )}
    >
      {t(`program-details-page.history.financial-statistic.${name}`)}
    </span>
  );
  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          method={filesService.getStatisticExportFile}
          dateRange={filtering!.dateRange}
          programId={id}
          title={title}
        />
      )}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      columns={columns}
      renderHeader={column =>
        column.tooltip ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <TooltipContent>
                {t(
                  `program-details-page.history.financial-statistic.tooltips.${column.name}`
                )}
              </TooltipContent>
            )}
          >
            {renderCell(column.name)}
          </Tooltip>
        ) : (
          renderCell(column.name)
        )
      }
      renderBodyRow={period => (
        <ProgramFinancialStatisticRow
          period={period}
          showCommissionRebateSometime={showCommissionRebateSometime}
          currency={currency}
        />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const ProgramFinancialStatistic = React.memo(_ProgramFinancialStatistic);
export default ProgramFinancialStatistic;
