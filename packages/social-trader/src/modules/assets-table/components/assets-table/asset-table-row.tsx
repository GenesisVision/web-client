import { CurrencyItem } from "components/currency-item/currency-item";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { Row } from "components/row/row";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { ASSET_INVEST } from "constants/constants";
import { CoinsAsset } from "gv-api-web";
import { useAuth } from "hooks/auth.hook";
import AssetBuy from "modules/assets-table/components/buttons/asset-buy.button";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

const ChartCell = styled(TableCell)`
  min-width: 50px;
  max-width: 100px;
  ${mediaBreakpointLandscapePhone(`min-width: 100px;max-width: 200px;`)};
`;

const FavoriteIconContainer = styled.div`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;

interface Props {
  asset: CoinsAsset;
  updateFavorites?: (isFavorite: boolean) => void;
}

const _AssetTableRow: React.FC<Props> = ({ asset, updateFavorites }) => {
  const [fundState, setFundState] = useState(asset);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setFundState(asset);
  }, [asset.isFavorite]);

  const handleUpdateRow = useCallback(
    asset => {
      setFundState(asset);
      updateFavorites && updateFavorites(asset.isFavorite);
    },
    [updateFavorites]
  );
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
            thousandSeparator=" "
            prefix={`$ `}
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
            value={formatCurrencyValue(asset.marketCap, "USD")}
            thousandSeparator=" "
            prefix={`$ `}
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(asset.totalVolume, "USD")}
            thousandSeparator=" "
            prefix={`$ `}
            displayType="text"
          />
        </Text>
      </TableCell>
      <ChartCell height={"small"}>
        <ProgramSimpleChart data={asset?.chart?.chart} />
      </ChartCell>
      {isAuthenticated && (
        <TableCell>
          <Row>
            <AssetBuy asset={asset} id={asset.id} />
          </Row>
        </TableCell>
      )}
      {isAuthenticated && (
        <TableCell>
          <FavoriteIconContainer>
            <ToggleAssetFavoriteButton
              asset={fundState}
              updateRow={handleUpdateRow}
              assetType={ASSET_INVEST.COIN}
              id={asset.id}
              isFavorite={fundState.isFavorite}
            >
              <FavoriteIcon selected={fundState.isFavorite} />
            </ToggleAssetFavoriteButton>
          </FavoriteIconContainer>
        </TableCell>
      )}
    </TableRow>
  );
};

const AssetTableRow = React.memo(_AssetTableRow);
export default AssetTableRow;
