import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { Text } from "components/text/text";
import { ASSET_INVEST } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import { useCallback, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import styled from "styled-components";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { transition } from "utils/style/mixins";

interface IProgramTableRowShortProps {
  follow: FollowDetailsListItem;
}

const LinkName = styled(Text)`
  margin-bottom: 3px;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  &:hover {
    opacity: 0.4;
  }
  ${transition("opacity")}
`;

const ChartCell = styled(TableCell)`
  max-width: 136px;
  width: 136px;
`;

const FavoriteIconContainer = styled.div`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;

const _FollowTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  follow
}) => {
  const [followState, setFollowState] = useState(follow);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const {
    balance,
    logoUrl,
    personalDetails,
    id,
    tags,
    subscribersCount,
    creationDate,
    statistic,
    tradesCount,
    url,
    color
  } = follow;
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  const handleUpdateRow = useCallback(follow => {
    setFollowState(follow);
  }, []);
  return (
    <TableRow>
      <TableCell>
        <Link noColor to={linkProps}>
          <AssetAvatarWithName
            url={logoUrl}
            alt={follow.title}
            color={color}
            name={
              <div>
                <LinkName sizeValue={"14"}>{follow.title}</LinkName>
                <TagProgramContainer tags={tags} />
              </div>
            }
          />
        </Link>
      </TableCell>
      <TableCell>
        {balance && (
          <NumberFormat
            value={formatCurrencyValue(balance.amount, balance.currency)}
            suffix={` ${balance.currency}`}
            thousandSeparator=" "
            displayType="text"
          />
        )}
      </TableCell>
      <TableCell>{subscribersCount}</TableCell>
      <TableCell>{distanceDate(creationDate)}</TableCell>
      <TableCell>{tradesCount}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell>
        <Profitability
          value={formatValue(statistic.profit, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profit, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <ChartCell>
        <ProgramSimpleChart data={statistic?.chart} />
      </ChartCell>
      {isAuthenticated && personalDetails && (
        <TableCell>
          <FavoriteIconContainer>
            <ToggleAssetFavoriteButton
              asset={followState}
              updateRow={handleUpdateRow}
              assetType={ASSET_INVEST.FOLLOW}
              id={id}
              isFavorite={followState.personalDetails.isFavorite}
            >
              <FavoriteIcon selected={followState.personalDetails.isFavorite} />
            </ToggleAssetFavoriteButton>
          </FavoriteIconContainer>
        </TableCell>
      )}
    </TableRow>
  );
};

const FollowTableRowShort = React.memo(_FollowTableRowShort);
export default FollowTableRowShort;
