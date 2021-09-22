import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import * as React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { CoinsAsset } from "gv-api-web";
import { CurrencyItem } from "components/currency-item/currency-item";
import { Row } from "components/row/row";
import LineBuyButton from "modules/assets-table/components/buttons/line-buy-button";
import { useAuth } from "hooks/auth.hook";

interface Props {
  asset: CoinsAsset;
}

const ChartCell = styled(TableCell)`
  min-width: 50px;
  max-width: 100px;
  ${mediaBreakpointLandscapePhone(`min-width: 100px;max-width: 200px;`)};
`;

const _AssetTableRow: React.FC<Props> = ({ asset }) => {
  const { isAuthenticated } = useAuth();
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
      <TableCell>
        {asset.name}
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(
              asset.price,
              "USD"
            )}
            thousandSeparator=" "
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
            value={formatCurrencyValue(
              asset.marketCap,
              "USD"
            )}
            thousandSeparator=" "
            suffix={` $`}
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(
              asset.change24Volume,
              "USD"
            )}
            thousandSeparator=" "
            suffix={` $`}
            displayType="text"
          />
        </Text>
      </TableCell>
      <ChartCell height={"small"}>
        <ProgramSimpleChart data={asset?.chart?.chart} />
      </ChartCell>
      {isAuthenticated && (<TableCell>
        <Row>
          <LineBuyButton asset={asset} id={asset.id} />
        </Row>
      </TableCell>)}
    </TableRow>
  );
};

const AssetTableRow = React.memo(_AssetTableRow);
export default AssetTableRow;
