import classNames from "classnames";
import { SignalSubscriber } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import AssetStatusLabel from "shared/components/asset-status/asset-status-label";
import { ACTION_STATUS_FILTER_VALUES } from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import {
  GetItemsFuncType,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { mapToTableItems } from "shared/components/table/helpers/mapper";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { DEFAULT_DECIMAL_SCALE, STATUS } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import {
  PROGRAM_SUBSCRIBERS_COLUMNS,
  PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS,
  PROGRAM_SUBSCRIBERS_FILTERS,
  SUBSCRIBERS_STATUS_TYPE
} from "../../program-details.constants";
import SubscriptionsFeesTooltip from "./program-subscriptions-fees-tooltip";

const _ProgramSubscriptions: React.FC<Props> = ({ t, id, currency }) => {
  const fetch: GetItemsFuncType = filters =>
    programsApi
      .v10ProgramsByIdSubscribersGet(id, authService.getAuthArg(), filters)
      .then(mapToTableItems<SignalSubscriber>("subscribers"));
  return (
    <TableModule
      getItems={fetch}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_SUBSCRIBERS_COLUMNS}
      filtering={PROGRAM_SUBSCRIBERS_FILTERS}
      defaultFilters={PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS}
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

const ProgramSubscriptions = compose<React.FC<OwnProps>>(translate())(
  _ProgramSubscriptions
);

export default ProgramSubscriptions;

interface Props extends OwnProps, WithTranslation {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
}
