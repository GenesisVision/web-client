import { CurrencyItem } from "components/currency-item/currency-item";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { CoinsAssetResponse } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { Row } from "components/row/row";

interface Props {
  asset: CoinsAssetResponse;
}

const _AssetPortfolioTableRow: React.FC<Props> = ({ asset }) => {
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
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.averagePrice, "USD")}
            suffix={` $`}
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.profitCurrent, "USD")}
            suffix={` $`}
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Row>
        </Row>
      </TableCell>
    </TableRow>
  );
};

const AssetPortfolioTableRow = React.memo(_AssetPortfolioTableRow);
export default AssetPortfolioTableRow;
