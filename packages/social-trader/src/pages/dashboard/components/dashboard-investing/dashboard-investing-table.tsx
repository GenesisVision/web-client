import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import {
  ComposeFiltersAllType,
  FilteringType
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  RenderBodyItemFuncType,
  TableSelectorType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { ApiAction } from "utils/types";

const _DashboardInvestingTable: React.FC<Props> = ({
  dataSelector,
  action,
  title,
  renderBodyCard
}) => {
  const [t] = useTranslation();
  const showIn = useSelector(currencySelector);
  const getItems = useCallback(filters => {
    return action({
      ...filters,
      showIn
    });
  }, []);
  return (
    <DashboardBlock>
      <TableContainer
        renderFilters={(
          updateFilter: UpdateFilterFunc,
          filtering: FilteringType
        ) => (
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(`dashboard-page.actions-status-filter.label`)}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
        )}
        dataSelector={dataSelector}
        isFetchOnMount={true}
        title={title}
        loaderData={[]}
        getItems={getItems}
        outerView={LIST_VIEW.CARDS}
        showSwitchView={false}
        renderBodyCard={renderBodyCard}
      />
    </DashboardBlock>
  );
};

interface Props {
  dataSelector: TableSelectorType;
  action: (filters?: ComposeFiltersAllType) => ApiAction;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const DashboardInvestingTable = React.memo(_DashboardInvestingTable);
export default DashboardInvestingTable;
