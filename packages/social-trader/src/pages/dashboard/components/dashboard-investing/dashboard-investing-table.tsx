import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import TableContainer from "components/table/components/table-container";
import {
  RenderBodyItemFuncType,
  TableSelectorType
} from "components/table/components/table.types";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { ApiAction } from "utils/types";

const _DashboardInvestingTable: React.FC<Props> = ({
  dataSelector,
  action,
  title,
  renderBodyCard
}) => {
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
  action: (filters?: ComposeFiltersAllType) => ApiAction<any>;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const DashboardInvestingTable = React.memo(_DashboardInvestingTable);
export default DashboardInvestingTable;
