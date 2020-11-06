import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import {
  FilteringType,
  TDefaultFilters
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  filtering?: FilteringType;
  defaultFilters?: TDefaultFilters;
  getItems: GetItemsFuncType;
  createButtonToolbar?: JSX.Element;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const _DashboardTradingTable: React.FC<Props> = ({
  defaultFilters,
  filtering,
  createButtonToolbar,
  getItems,
  title,
  renderBodyCard
}) => {
  const [t] = useTranslation();
  return (
    <DashboardBlock>
      <TableModule
        name={"DashboardTradingTable"}
        cache
        defaultFilters={defaultFilters}
        filtering={filtering}
        paging={DEFAULT_CARD_PAGING}
        createButtonToolbar={createButtonToolbar}
        title={title}
        loaderData={[]}
        getItems={getItems}
        outerView={LIST_VIEW.CARDS}
        showSwitchView={false}
        renderFilters={(
          updateFilter: UpdateFilterFunc,
          filtering: FilteringType
        ) => (
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(`actions-status-filter.label`)}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
        )}
        renderBodyCard={renderBodyCard}
      />
    </DashboardBlock>
  );
};

const DashboardTradingTable = React.memo(_DashboardTradingTable);
export default DashboardTradingTable;
