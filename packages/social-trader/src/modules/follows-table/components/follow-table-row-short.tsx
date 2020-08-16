import clsx from "clsx";
import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import styles from "modules/programs-table/components/programs-table/programs-table.module.scss";
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
      <TableCell className={styles["programs-table__cell"]}>
        <Link to={linkProps}>
          <AssetAvatarWithName
            url={logoUrl}
            alt={follow.title}
            color={color}
            name={
              <div>
                <Link
                  className={styles["programs-table__cell--link"]}
                  to={linkProps}
                >
                  {follow.title}
                </Link>
                <TagProgramContainer tags={tags} />
              </div>
            }
          />
        </Link>
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
        {balance && (
          <NumberFormat
            value={formatCurrencyValue(balance.amount, balance.currency)}
            suffix={` ${balance.currency}`}
            displayType="text"
          />
        )}
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
        {subscribersCount}
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
        {distanceDate(creationDate)}
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
        {tradesCount}
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className={styles["programs-table__cell"]}>
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
      <TableCell
        className={clsx(
          styles["programs-table__cell"],
          styles["programs-table__cell--chart"]
        )}
      >
        <ProgramSimpleChart data={statistic?.chart} />
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className={styles["programs-table__cell"]}>
          <FavoriteIconContainer>
            <ToggleAssetFavoriteButton
              asset={followState}
              updateRow={handleUpdateRow}
              assetType={ASSET.FOLLOW}
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

interface IProgramTableRowShortProps {
  follow: FollowDetailsListItem;
}

const FollowTableRowShort = React.memo(_FollowTableRowShort);
export default FollowTableRowShort;
