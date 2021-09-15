import { composePaging } from "components/table/helpers/paging.helpers";
import { CoinsAssetResponseItemsViewModel } from "gv-api-web";
import useRouteFilters from "hooks/route-filters.hook";
import { useTranslation } from "i18n";
import AssetsPortfolioTable from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table";
import * as React from "react";

const DEFAULT_ITEMS_ON_PAGE = 12;

const _AssetPortfolioTableSSR: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
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
    <AssetsPortfolioTable
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
  data: CoinsAssetResponseItemsViewModel;
}

const AssetsPortfolioTableSsr = React.memo(_AssetPortfolioTableSSR);
export default AssetsPortfolioTableSsr;
