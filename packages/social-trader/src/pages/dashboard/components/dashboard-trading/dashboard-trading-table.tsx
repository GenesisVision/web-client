import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { FilteringType } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  RenderBodyItemFuncType,
  TableSelectorType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardTradingTable: React.FC<Props> = ({
  dataSelector,
  createButtonToolbar,
  getItems,
  title,
  renderBodyCard
}) => {
  const [t] = useTranslation();
  return (
    <DashboardBlock>
      <TableContainer
        isFetchOnMount={true}
        dataSelector={dataSelector}
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
            label={t(`dashboard-page:actions-status-filter.label`)}
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

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  createButtonToolbar?: JSX.Element;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const DashboardTradingTable = React.memo(_DashboardTradingTable);
export default DashboardTradingTable;
