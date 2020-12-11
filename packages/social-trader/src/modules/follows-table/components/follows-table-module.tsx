import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableRow from "./follow-table-row-short";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

interface Props extends ITableModuleProps {
  title?: string;
}

const FollowsTableModule: React.FC<Props> = React.memo(
  ({
    name,
    renderMappings,
    getItems,
    renderFilters,
    sorting,
    filtering,
    defaultFilters,
    paging,
    title,
    disableTitle,
    columns
  }) => {
    return (
      <TableModule
        name={"FollowsTableModule" + name}
        cache
        loaderData={followListLoaderData}
        renderMappings={renderMappings}
        disableTitle={disableTitle}
        getItems={getItems}
        defaultFilters={defaultFilters}
        filtering={filtering}
        sorting={sorting}
        renderFilters={renderFilters}
        paging={paging}
        title={title}
        columns={columns || FOLLOW_COLUMNS}
        renderHeader={column => <FollowTableHeaderCell column={column} />}
        renderBodyRow={follow => <FollowTableRow follow={follow} />}
      />
    );
  }
);

export default FollowsTableModule;
