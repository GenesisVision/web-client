import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { FundAssetInfo } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import { FUND_STRUCTURE_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import Table from "shared/components/table/components/table";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

import { fundStructureTableSelector } from "../../reducers/fund-structure.reducer";
import FundStructureHeaderCell from "./fund-structure-header-cell";

const _FundStructure: React.FC = () => {
  const [t] = useTranslation();
  const items = useSelector(fundStructureTableSelector);
  return (
    <Table
      items={items}
      columns={FUND_STRUCTURE_COLUMNS}
      renderHeader={(column: SortingColumn) => {
        return column.tooltip ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.CENTER}
            render={() => (
              <div className="tooltip__content">
                {t(`fund-details-page.tooltip.${column.name}`)}
              </div>
            )}
          >
            <span>
              <FundStructureHeaderCell column={column} />
            </span>
          </Tooltip>
        ) : (
          <FundStructureHeaderCell column={column} />
        );
      }}
      renderBodyRow={(item: FundAssetInfo) => (
        <TableRow stripy>
          <TableCell className="details-structure__cell fund-details-structure__cell">
            {item.asset}
          </TableCell>
          <TableCell className="details-structure__cell">
            <CurrencyItem logo={item.icon} name={item.symbol} small />
          </TableCell>
          <TableCell className="details-structure__cell fund-details-structure__cell">
            <NumberFormat
              value={formatValue(item.target)}
              suffix={"%"}
              displayType="text"
            />
          </TableCell>
          <TableCell className="details-structure__cell fund-details-structure__cell">
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
