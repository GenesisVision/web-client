import TableModule from "components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType
} from "components/table/components/table.types";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import { LIST_VIEW } from "components/table/table.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";

const _DashboardInvestingTable: React.FC<Props> = ({
  getItems,
  title,
  renderBodyCard
}) => {
  return (
    <DashboardBlock>
      <TableModule
        title={title}
        loaderData={[]}
        getItems={getItems}
        outerView={LIST_VIEW.CARDS}
        showSwitchView={false}
        paging={DEFAULT_CARD_PAGING}
        renderBodyCard={renderBodyCard}
      />
    </DashboardBlock>
  );
};

interface Props {
  getItems: GetItemsFuncType;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const DashboardInvestingTable = React.memo(_DashboardInvestingTable);
export default DashboardInvestingTable;
