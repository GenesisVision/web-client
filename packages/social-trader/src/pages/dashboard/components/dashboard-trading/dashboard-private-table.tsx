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
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  filtering?: FilteringType;
  defaultFilters?: TDefaultFilters;
  getItems: GetItemsFuncType;
  createButtonToolbar?: JSX.Element;
  title: string | JSX.Element;
  renderBodyCard?: RenderBodyItemFuncType;
}

const _DashboardPrivateTable: React.FC<Props> = ({
  name,
  defaultFilters,
  filtering,
  createButtonToolbar,
  getItems,
  title,
  renderBodyCard
}) => {
  const [t] = useTranslation();
  return (
    <TableModule
      name={name}
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
  );
};

const DashboardPrivateTable = React.memo(_DashboardPrivateTable);
export default DashboardPrivateTable;
