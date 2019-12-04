import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import GVButton from "components/gv-button";
import Link from "components/link/link";
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
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardTradingTable: React.FC<Props> = ({
  createButtonToolbar,
  filtering,
  defaultFilters,
  getItems,
  title,
  renderBodyCard
}) => {
  const [t] = useTranslation();
  return (
    <DashboardBlock>
      <TableModule
        createButtonToolbar={createButtonToolbar}
        title={title}
        loaderData={[]}
        getItems={getItems}
        outerView={LIST_VIEW.CARDS}
        showSwitchView={false}
        filtering={filtering}
        defaultFilters={defaultFilters}
        paging={DEFAULT_PAGING}
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
        renderBodyCard={renderBodyCard}
      />
    </DashboardBlock>
  );
};

interface Props {
  createButtonToolbar?: JSX.Element;
  getItems: GetItemsFuncType;
  defaultFilters?: TDefaultFilters;
  filtering?: FilteringType;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

export const CreateButtonToolbar: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => (
  <Link to={route} className="dashboard-trading__button">
    <GVButton color="primary" variant="text">
      {text}
    </GVButton>
  </Link>
));

const DashboardTradingTable = React.memo(_DashboardTradingTable);
export default DashboardTradingTable;
