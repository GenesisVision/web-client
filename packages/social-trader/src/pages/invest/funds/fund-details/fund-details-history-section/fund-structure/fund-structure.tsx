import { CurrencyItem } from "components/currency-item/currency-item";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { FundAssetInfo } from "gv-api-web";
import { FUND_STRUCTURE_COLUMNS } from "pages/invest/funds/fund-details/fund-details.constants";
import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatValue } from "utils/formatter";

import { fundStructureTableSelector } from "../../reducers/fund-structure.reducer";
import FundStructureHeaderCell from "./fund-structure-header-cell";

const _FundStructure: React.FC = () => {
  const items = useSelector(fundStructureTableSelector);
  return (
    <Table
      items={items}
      columns={FUND_STRUCTURE_COLUMNS}
      renderHeader={(column: SortingColumn) => (
        <FundStructureHeaderCell column={column} />
      )}
      renderBodyRow={(item: FundAssetInfo) => (
        <TableRow stripy>
          <TableCell>{item.asset}</TableCell>
          <TableCell>
            <CurrencyItem
              url={item.url}
              logo={item.logoUrl}
              name={item.symbol}
              small
            />
          </TableCell>
          <TableCell>
            <NumberFormat
              value={formatValue(item.currentAmount)}
              displayType="text"
            />
          </TableCell>
          <TableCell>
            <NumberFormat
              value={formatValue(item.target)}
              suffix={"%"}
              displayType="text"
            />
          </TableCell>
          <TableCell>
            <NumberFormat
              value={formatValue(item.current, 2)}
              suffix={"%"}
              displayType="text"
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const FundStructure = React.memo(_FundStructure);
export default FundStructure;
