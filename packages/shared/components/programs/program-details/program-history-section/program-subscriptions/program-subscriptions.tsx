import classNames from "classnames";
import { SignalSubscriber } from "gv-api-web";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatusLabel from "shared/components/asset-status/asset-status-label";
import { ACTION_STATUS_FILTER_VALUES } from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { UpdateFilterFunc } from "shared/components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE, STATUS } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import {
  PROGRAM_SUBSCRIBERS_COLUMNS,
  SUBSCRIBERS_STATUS_TYPE
} from "../../program-details.constants";
import { subscriptionsTableSelector } from "../../reducers/program-history.reducer";
import { getSubscriptions } from "../../services/program-details.service";
import SubscriptionsFeesTooltip from "./program-subscriptions-fees-tooltip";

const _ProgramSubscriptions: React.FC<Props> = ({ id, currency }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getSubscriptions(id)}
      dataSelector={subscriptionsTableSelector}
      isFetchOnMount={true}
      columns={PROGRAM_SUBSCRIBERS_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <SelectFilter
          name={SUBSCRIBERS_STATUS_TYPE}
          label={t("program-details-page.history.subscriptions.status")}
          value={filtering[SUBSCRIBERS_STATUS_TYPE] as SelectFilterType} //TODO fix filtering types
          values={ACTION_STATUS_FILTER_VALUES}
          onChange={updateFilter}
        />
      )}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.subscriptions.${column.name}`)}
        </span>
      )}
      renderBodyRow={(subscription: SignalSubscriber) => (
        <TableRow stripy>
          <TableCell>{subscription.number}</TableCell>
          <TableCell>{subscription.trades}</TableCell>
          <TableCell>
            <Profitability
              value={formatCurrencyValue(subscription.profit, currency)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatCurrencyValue(subscription.profit, currency)}
                thousandSeparator=" "
                displayType="text"
                allowNegative={false}
              />
            </Profitability>
          </TableCell>
          <TableCell className="subscription-fees">
            <SubscriptionsFeesTooltip subscription={subscription}>
              <span
                className={classNames({
                  "fee-commission__value":
                    subscription.totalCommissionAmount > 0
                })}
              >
                {formatValue(
                  subscription.totalCommissionAmount,
                  DEFAULT_DECIMAL_SCALE
                )}
              </span>
            </SubscriptionsFeesTooltip>
          </TableCell>
          <TableCell>{subscription.volume}</TableCell>
          <TableCell>
            {moment(subscription.subscriptionDate).format()}
          </TableCell>
          <TableCell>
            {subscription.unsubscriptionDate &&
              moment(subscription.unsubscriptionDate).format()}
          </TableCell>
          <TableCell>
            <AssetStatusLabel status={subscription.status as STATUS} />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const ProgramSubscriptions = React.memo(_ProgramSubscriptions);

export default ProgramSubscriptions;

interface Props extends OwnProps {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
}
