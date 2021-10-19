import { CurrencyItem } from "components/currency-item/currency-item";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { CoinsAsset } from "gv-api-web";
import AssetBuy from "modules/assets-table/components/buttons/asset-buy.button";
import AssetSell from "modules/assets-table/components/buttons/asset-sell.button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";

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
            value={asset.price}
            prefix={`$ `}
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
          <NumberFormat
            value={asset.amount}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={asset.total}
            prefix={`$ `}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={asset.averagePrice}
            prefix={`$ `}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <Profitability
            value={formatCurrencyValue(asset.profitCurrent, "USD")}
          >
            <NumberFormat
              value={formatCurrencyValue(asset.profitCurrent, "USD")}
              prefix={` $ `}
              thousandSeparator=" "
              displayType="text"
            />
          </Profitability>
        </Text>
      </TableCell>
      <TableCell>
        <Row>
          <RowItem>
            <AssetBuy asset={asset} id={asset.oefAssetId} onApply={onApply} />
          </RowItem>
          <RowItem>
            <AssetSell asset={asset} id={asset.oefAssetId} onApply={onApply} />
          </RowItem>
        </Row>
      </TableCell>
    </TableRow>
  );
};

const AssetPortfolioTableRow = React.memo(_AssetPortfolioTableRow);
export default AssetPortfolioTableRow;
