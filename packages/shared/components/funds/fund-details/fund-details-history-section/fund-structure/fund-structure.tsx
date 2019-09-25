import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { FundAssetInfo } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { FUND_STRUCTURE_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import Tooltip from "shared/components/tooltip/tooltip";
import { formatValue } from "shared/utils/formatter";

import { fundStructureTableSelector } from "../../reducers/fund-structure.reducer";
import { getFundStructure } from "../../services/fund-details.service";
import FundStructureHeaderCell from "./fund-structure-header-cell";

const FundStructure: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  if (!id) return null;
  return (
    <TableContainer
      getItems={getFundStructure(id)}
      dataSelector={fundStructureTableSelector}
      columns={FUND_STRUCTURE_COLUMNS}
      isFetchOnMount={true}
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
            <div className="details-structure__symbol">
              <FundAssetImage url={item.icon} alt={item.symbol} />
              <div className="details-structure__symbol-name">
                {item.symbol}
              </div>
            </div>
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

export default FundStructure;

interface Props {
  id: string;
}
