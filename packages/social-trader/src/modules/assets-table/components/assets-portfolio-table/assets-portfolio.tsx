import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import TableContainer from "components/table/components/table-container";
import { ASSETS_PORTFOLIO_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import AssetsPortfolioTableHeaderCell from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-header-cell";
import { assetsListLoaderDataWithCount } from "modules/assets-table/components/assets-table/assets-table.loader-data";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";

const _AssetsPortfolio: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector
}) => {
  const renderHeader = useCallback(
    column => <AssetsPortfolioTableHeaderCell column={column} />,
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
      loaderData={assetsListLoaderDataWithCount()}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
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
