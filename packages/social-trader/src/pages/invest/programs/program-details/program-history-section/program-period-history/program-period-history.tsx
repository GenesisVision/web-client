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
import { ProgramPeriodHistoryRow } from "pages/invest/programs/program-details/program-history-section/program-period-history/program-period-history-row";
import React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import { PROGRAM_PERIOD_HISTORY } from "../../program-details.constants";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";

const _ProgramPeriodHistory: React.FC<Props> = ({
  getItems,
  dataSelector,
  currency,
  id
}) => {
  const [t] = useTranslation();
  const renderCell = (name: string) => (
    <span
      className={classNames(
        styles["details-trades__head-cell"],
        styles[`program-details-trades__cell--${column.name}`]
      )}
    >
      {t(`program-details-page.history.period-history.${name}`)}
    </span>
  );
  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbar
          filtering={filtering!.dateRange}
          programId={id}
          getExportFileUrl={filesService.getPeriodExportFileUrl}
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
      columns={PROGRAM_PERIOD_HISTORY}
      renderHeader={column =>
        column.tooltip ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <TooltipContent>
                {t(
                  `program-details-page.history.period-history.tooltips.${column.name}`
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
        <ProgramPeriodHistoryRow period={period} currency={currency} />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  id: string;
  currency: CurrencyEnum;
}

const ProgramPeriodHistory = React.memo(_ProgramPeriodHistory);
export default ProgramPeriodHistory;
