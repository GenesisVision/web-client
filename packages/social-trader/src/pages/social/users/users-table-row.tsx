import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { GV_BTN_SIZE } from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UserAvatarList } from "components/user-avatar-list/user-avatar-list";
import { UserDetailsList } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./users-table-row.module.scss";

const USER_TABLE_ROW_CURRENCY = "USD";

export const UsersTableRow: React.FC<{ user: UserDetailsList }> = ({
  user: {
    personalDetails,
    userId,
    followersCount,
    followers,
    about,
    url,
    logoUrl,
    username,
    regDate,
    totalProfit,
    assetsUnderManagement,
    investorsCount
  }
}) => {
  const [t] = useTranslation();
  const { contextTitle } = useToLink();
  const profileUrl = managerToPathCreator(url, contextTitle);
  const slicedAbout =
    about && about.split(" ").length > 13
      ? about
          .split(" ")
          .slice(0, 13)
          .join(" ") + " ..."
      : about;

  const renderHidden = () => <MutedText>{t("Hidden")}</MutedText>;
  return (
    <TableRow className={styles["users-table-row"]}>
      <TableCell className={styles["users-table-row__about-cell"]}>
        <Row center={false}>
          <RowItem>
            <Link to={profileUrl}>
              <ProfileAvatar url={logoUrl} alt={username} />
            </Link>
          </RowItem>
          <RowItem>
            <Row>
              <Link white to={profileUrl}>
                <b>{username}</b>
              </Link>
            </Row>
            <Row small className={styles["users-table-row__about"]}>
              {slicedAbout}
            </Row>
          </RowItem>
        </Row>
      </TableCell>
      <TableCell>
        {followers.length ? (
          <UserAvatarList count={followersCount} list={followers} />
        ) : (
          "0"
        )}
      </TableCell>
      <TableCell>{distanceDate(regDate)}</TableCell>
      <TableCell>
        {assetsUnderManagement === null ? (
          renderHidden()
        ) : (
          <NumberFormat
            value={formatCurrencyValue(
              assetsUnderManagement,
              USER_TABLE_ROW_CURRENCY
            )}
            suffix={` ${USER_TABLE_ROW_CURRENCY}`}
            displayType="text"
          />
        )}
      </TableCell>
      <TableCell>
        {investorsCount === null ? renderHidden() : investorsCount}
      </TableCell>
      <TableCell>
        {totalProfit === null ? (
          renderHidden()
        ) : (
          <NumberFormat
            value={formatCurrencyValue(totalProfit, USER_TABLE_ROW_CURRENCY)}
            suffix={` ${USER_TABLE_ROW_CURRENCY}`}
            displayType="text"
          />
        )}
      </TableCell>
      {personalDetails && (
        <TableCell>
          <FollowUserButton
            disabled={!personalDetails.allowFollow}
            size={GV_BTN_SIZE.SMALL}
            id={userId}
            value={personalDetails.isFollow}
          />
        </TableCell>
      )}
    </TableRow>
  );
};
