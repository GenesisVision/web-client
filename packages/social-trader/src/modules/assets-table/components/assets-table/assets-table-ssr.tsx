import { composePaging } from "components/table/helpers/paging.helpers";
import useRouteFilters from "hooks/route-filters.hook";
import * as React from "react";
import { CoinsAssetItemsViewModel } from "gv-api-web";
import AssetsTable from "modules/assets-table/components/assets-table/assets-table";

const DEFAULT_ITEMS_ON_PAGE = 12;

const _AssetsTableSSR: React.FC<Props> = ({
  data
}) => {
  const [
    filtering,
    sorting,
    page,
    update,
    updateSorting,
    updatePaging
  ] = useRouteFilters("", []);

  if (!data) return null;
  return (
    <AssetsTable
      data={data.items}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={composePaging(data.total, page, DEFAULT_ITEMS_ON_PAGE)}
      updatePaging={updatePaging}
      asLinkPagination={true}
    />
  );
};

interface Props {
  data: CoinsAssetItemsViewModel;
}

const AssetsTableSSR = React.memo(_AssetsTableSSR);
export default AssetsTableSSR;