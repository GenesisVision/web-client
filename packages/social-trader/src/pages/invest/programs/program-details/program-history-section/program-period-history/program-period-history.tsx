import classNames from "classnames";
import Popover from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { TableCell, TableRow } from "components/table/components";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import withLoader from "decorators/with-loader";
import { ProgramPeriodViewModel } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import filesService from "services/file-service";
import { formatDate, humanizeDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
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
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`program-details-page.history.period-history.${column.name}`)}
        </span>
      )}
      renderBodyRow={period => (
        <ProgramPeriodHistoryRow period={period} currency={currency} />
      )}
    />
  );
};

const _ProgramPeriodHistoryPopupItem: React.FC<{
  label: string;
  value: number;
  currency: CurrencyEnum;
}> = ({ label, value, currency }) => (
  <PopoverContentListItem>
    <div className="details-trades__history-popup-item">
      <div className="details-trades__history-popup-item-name">{label}</div>
      <div className="details-trades__history-popup-item-value">
        {value} {currency}
      </div>
    </div>
  </PopoverContentListItem>
);
const ProgramPeriodHistoryPopupItem = withLoader(
  _ProgramPeriodHistoryPopupItem
);

const ProgramPeriodHistoryPopup: React.FC<ProgramPeriodHistoryPopupProps> = ({
  anchor,
  onClose,
  period,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <Popover ownWidth anchorEl={anchor} onClose={onClose}>
      <PopoverContent type={"list"}>
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsDeposit}
          label={t(
            "program-details-page.history.period-history.investors-deposit"
          )}
          value={period.investorsDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-withdraw"
          )}
          value={period.investorsWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerDeposit}
          label={t(
            "program-details-page.history.period-history.manager-deposit"
          )}
          value={period.managerDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerWithdraw}
          label={t(
            "program-details-page.history.period-history.manager-withdraw"
          )}
          value={period.managerWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsProfitWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-profit-withdraw"
          )}
          value={period.investorsProfitWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.platformSuccessFee}
          label={t(
            "program-details-page.history.period-history.platform-success-fee"
          )}
          value={period.platformSuccessFee}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerCommissionRebate}
          label={t(
            "program-details-page.history.period-history.manager-commission-rebate"
          )}
          value={period.managerCommissionRebate}
          currency={currency}
        />
      </PopoverContent>
    </Popover>
  );
};

const ProgramPeriodHistoryRow: React.FC<ProgramPeriodHistoryRowProps> = ({
  period,
  currency
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const haveInfo =
    !!period.investorsDeposit ||
    !!period.investorsWithdraw ||
    !!period.managerDeposit ||
    !!period.managerWithdraw ||
    !!period.investorsProfitWithdraw ||
    !!period.platformSuccessFee ||
    !!period.managerCommissionRebate;
  return (
    <>
      {haveInfo && (
        <ProgramPeriodHistoryPopup
          period={period}
          currency={currency}
          anchor={anchor}
          onClose={clearAnchor}
        />
      )}
      <TableRow
        stripy
        onClick={setAnchor}
        className={classNames({ "table__row--clickable": haveInfo })}
      >
        <TableCell className="details-trades__cell--period">
          {period.number}
        </TableCell>
        <TableCell>{formatDate(period.dateFrom)}</TableCell>
        <TableCell>{humanizeDate(0, period.periodLength)}</TableCell>
        <TableCell>
          <NumberFormat
            value={formatCurrencyValue(period.balance, currency)}
            displayType="text"
            thousandSeparator=" "
            suffix={` ${currency}`}
          />
        </TableCell>
        <TableCell>
          <Profitability
            value={period.profit}
            prefix={PROFITABILITY_PREFIX.SIGN}
          >
            <NumberFormat
              value={formatCurrencyValue(period.profit, currency)}
              thousandSeparator=" "
              displayType="text"
              allowNegative={false}
              suffix={` ${currency}`}
            />
          </Profitability>
        </TableCell>
        <TableCell>
          <NumberFormat value={period.investors} displayType="text" />
        </TableCell>
      </TableRow>
    </>
  );
};

interface ProgramPeriodHistoryRowProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

interface ProgramPeriodHistoryPopupProps extends ProgramPeriodHistoryRowProps {
  anchor: TAnchor;
  onClose: () => void;
}

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  id: string;
  currency: CurrencyEnum;
}

const ProgramPeriodHistory = React.memo(_ProgramPeriodHistory);
export default ProgramPeriodHistory;
