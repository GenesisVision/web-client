import { SignalSubscriber } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import TableModule from "shared/components/table/components/table-module";
import { mapToTableItems } from "shared/components/table/helpers/mapper";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { formatCurrencyValue } from "shared/utils/formatter";

import { PROGRAM_SUBSCRIBERS_COLUMNS } from "../program-details.constants";

const _ProgramSubscriptions: React.FC<Props> = ({ t, id, currency }) => {
  const fetch = () =>
    programsApi
      .v10ProgramsByIdSubscribersGet(id, authService.getAuthArg())
      .then(mapToTableItems<SignalSubscriber>("subscribers"));
  return (
    <TableModule
      getItems={fetch}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_SUBSCRIBERS_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.subscriptions.${column.name}`)}
        </span>
      )}
      renderBodyRow={(subscription: SignalSubscriber) => {
        return (
          <TableRow>
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
                  suffix={` ${currency}`}
                />
              </Profitability>
            </TableCell>
            <TableCell>{subscription.volume}</TableCell>
            <TableCell>
              {moment(subscription.subscriptionDate).format()}
            </TableCell>
            <TableCell>
              {subscription.unsubscriptionDate &&
                moment(subscription.unsubscriptionDate).format()}
            </TableCell>
            <TableCell>{subscription.status}</TableCell>
          </TableRow>
        );
      }}
    />
  );
};

const ProgramSubscriptions = compose<React.FC<OwnProps>>(translate())(
  _ProgramSubscriptions
);

export default ProgramSubscriptions;

interface Props extends OwnProps, InjectedTranslateProps {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
}
