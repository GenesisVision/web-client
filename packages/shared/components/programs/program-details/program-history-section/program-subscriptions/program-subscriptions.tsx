import { SignalSubscriber } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { ACTION_STATUS_FILTER_VALUES } from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { UpdateFilterFunc } from "shared/components/table/components/table.types";
import { CurrencyEnum } from "shared/utils/types";

import {
  PROGRAM_SUBSCRIBERS_COLUMNS,
  SUBSCRIBERS_STATUS_TYPE
} from "../../program-details.constants";
import { subscriptionsTableSelector } from "../../reducers/program-history.reducer";
import { getSubscriptions } from "../../services/program-details.service";
import ProgramSubscriptionsRow from "./program-subscriptions-row";

const _ProgramSubscriptions: React.FC<Props> = ({ id, currency }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getSubscriptions(id)}
      dataSelector={subscriptionsTableSelector}
      isFetchOnMount={false}
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
        <ProgramSubscriptionsRow
          subscription={subscription}
          currency={currency}
        />
      )}
    />
  );
};

interface Props {
  id: string;
  currency: CurrencyEnum;
}

const ProgramSubscriptions = React.memo(_ProgramSubscriptions);
export default ProgramSubscriptions;
