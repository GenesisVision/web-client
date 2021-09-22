import { CurrencyItem } from "components/currency-item/currency-item";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { CoinsAsset } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { Row } from "components/row/row";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import LineSellButton from "modules/assets-table/components/buttons/line-sell-button";
import LineBuyButton from "modules/assets-table/components/buttons/line-buy-button";

interface Props {
  asset: CoinsAsset;
  onApply?: VoidFunction;
}

const _AssetPortfolioTableRow: React.FC<Props> = ({ asset, onApply }) => {
  return (
    <TableRow>
      <TableCell>
        <CurrencyItem
          url={asset.url}
          logo={asset.logoUrl}
          name={asset.asset}
          small
        />
      </TableCell>
      <TableCell>{asset.name}</TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.price, "USD")}
            suffix={` $`}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Profitability
          value={formatValue(asset.change24Percent, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(asset.change24Percent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <Tooltip horizontal={HORIZONTAL_POPOVER_POS.LEFT} render={() => (
            <TooltipContent>
              <NumberFormat
                value={formatCurrencyValue(asset.amount * asset.price, "USD")}
                suffix={` $`}
                thousandSeparator=" "
                displayType="text"
              />
            </TooltipContent>
          )}>
            <NumberFormat
              value={asset.amount}
              thousandSeparator=" "
              displayType="text"
            />
          </Tooltip>
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.averagePrice, "USD")}
            suffix={` $`}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.profitCurrent, "USD")}
            suffix={` $`}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Row>
          <LineBuyButton asset={asset} id={asset.oefAssetId} onApply={onApply} />
          <LineSellButton asset={asset} id={asset.oefAssetId} onApply={onApply} />
        </Row>
      </TableCell>
    </TableRow>
  );
};

const AssetPortfolioTableRow = React.memo(_AssetPortfolioTableRow);
export default AssetPortfolioTableRow;
