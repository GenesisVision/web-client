import classNames from "classnames";
import { ProgramPeriodViewModel } from "gv-api-web";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Popover from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import withLoader from "shared/decorators/with-loader";
import useAnchor, { TAnchor } from "shared/hooks/anchor.hook";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, humanizeDate } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { PROGRAM_PERIOD_HISTORY } from "../../program-details.constants";
import { periodHistoryTableSelector } from "../../reducers/program-history.reducer";
import { getPeriodHistory } from "../../services/program-details.service";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";

const _ProgramPeriodHistory: React.FC<Props> = ({ currency, id }) => {
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
      getItems={getPeriodHistory(id)}
      dataSelector={periodHistoryTableSelector}
      isFetchOnMount={false}
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
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
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
  <div className="details-trades__history-popup-item">
    <div className="details-trades__history-popup-item-name">{label}</div>
    <div className="details-trades__history-popup-item-value">
      {value} {currency}
    </div>
  </div>
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
      <div className="details-trades__history-popup">
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
      </div>
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
        <TableCell>
          {moment(new Date(period.dateFrom)).format("YYYY-MM-DD HH:mm")}
        </TableCell>
        <TableCell>{humanizeDate(period.periodLength)}</TableCell>
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
  id: string;
  currency: CurrencyEnum;
}

const ProgramPeriodHistory = React.memo(_ProgramPeriodHistory);
export default ProgramPeriodHistory;
