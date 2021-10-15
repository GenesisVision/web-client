import { SortingColumn } from "components/table/components/filtering/filter.type";
import {
  GetItemsFuncActionType,
  RenderBodyItemFuncType,
  RenderFiltersFuncType,
  TableSelectorType,
  TRenderHeaderFunc
} from "components/table/components/table.types";
import TableContainer from "components/table/components/table-container";
import { LIST_VIEW } from "components/table/table.constants";
import React from "react";

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  createButtonToolbar?: JSX.Element;
  title: string | JSX.Element;
  renderBodyRow?: RenderBodyItemFuncType;
  renderFilters?: RenderFiltersFuncType;
  renderHeader?: TRenderHeaderFunc;
  columns?: SortingColumn[];
}

const _DashboardInvestingCoinsTable: React.FC<Props> = ({
  renderFilters,
  getItems,
  dataSelector,
  title,
  renderBodyRow,
  renderHeader,
  columns
}) => {
  return (
    <TableContainer
      title={title}
      loaderData={[]}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      columns={columns}
      renderFilters={renderFilters}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
      outerView={LIST_VIEW.TABLE}
      showSwitchView={false}
    />
  );
};

const DashboardInvestingCoinsTable = React.memo(_DashboardInvestingCoinsTable);
export default DashboardInvestingCoinsTable;
