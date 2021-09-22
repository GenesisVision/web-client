import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";
import { ASSETS_PORTFOLIO_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetsPortfolioTableHeaderCell
  from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-header-cell";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import { assetsPortfolioListLoaderDataWithCount } from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table.loader-data";

const _AssetsPortfolio: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector,
}) => {
  const renderHeader = useCallback(
    column => (
      <AssetsPortfolioTableHeaderCell column={column} />
    ),
    []
  );
  const renderBodyRow = useCallback(
    (asset, updateRow) => (
      <AssetPortfolioTableRow asset={asset} onApply={updateRow} />
    ),
    []
  );

  return (
    <TableContainer
      loaderData={assetsPortfolioListLoaderDataWithCount()}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      paging={DEFAULT_PAGING}
      columns={ASSETS_PORTFOLIO_TABLE_COLUMNS}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

interface Props {
  itemSelector: (state: RootState) => { [keys: string]: any };
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
}

const AssetsPortfolio = React.memo(_AssetsPortfolio);
export default AssetsPortfolio;
