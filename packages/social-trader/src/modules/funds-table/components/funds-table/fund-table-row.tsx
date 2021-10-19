import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { ASSET_INVEST } from "constants/constants";
import { FundDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import { useCallback, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import styled from "styled-components";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

interface Props {
  fund: FundDetailsListItem;
}

const FavoriteIconContainer = styled.div`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;

const ChartCell = styled(TableCell)`
  min-width: 50px;
  max-width: 100px;
  ${mediaBreakpointLandscapePhone(`min-width: 100px;max-width: 200px;`)};
`;

const _FundsTableRow: React.FC<Props> = ({ fund }) => {
  const [fundState, setFundState] = useState(fund);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { linkCreator } = useToLink();
  const link = linkCreator(
    composeFundsDetailsUrl(fund.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  const handleUpdateRow = useCallback(fund => {
    setFundState(fund);
  }, []);
  return (
    <TableRow>
      <TableCell height={"small"}>
        <Link noColor to={link}>
          <AssetAvatarWithName
            url={fund.logoUrl}
            alt={fund.title}
            color={fund.color}
            name={fund.title}
          />
        </Link>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={formatCurrencyValue(
              fund.balance.amount,
              fund.balance.currency
            )}
            thousandSeparator=" "
            suffix={` ${fund.balance.currency}`}
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <FundAssetContainer
          noWrap
          assets={fund.topFundAssets}
          type={"short"}
          size={3}
          length={fund.totalAssetsCount}
        />
      </TableCell>
      <TableCell>{fund.investorsCount}</TableCell>
      <TableCell>{distanceDate(fund.creationDate)}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatValue(fund.statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell>
        <Profitability
          value={formatValue(fund.statistic.profit, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(fund.statistic.profit, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <ChartCell height={"small"}>
        <ProgramSimpleChart data={fund?.statistic?.chart} />
      </ChartCell>
      {isAuthenticated && fund.personalDetails && (
        <TableCell>
          <FavoriteIconContainer>
            <ToggleAssetFavoriteButton
              asset={fundState}
              updateRow={handleUpdateRow}
              assetType={ASSET_INVEST.FUND}
              id={fund.id}
              isFavorite={fundState.personalDetails.isFavorite}
            >
              <FavoriteIcon selected={fundState.personalDetails.isFavorite} />
            </ToggleAssetFavoriteButton>
          </FavoriteIconContainer>
        </TableCell>
      )}
    </TableRow>
  );
};

const FundsTableRow = React.memo(_FundsTableRow);
export default FundsTableRow;
