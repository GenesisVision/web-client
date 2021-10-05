import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { UserAvatarList } from "components/user-avatar-list/user-avatar-list";
import { UserDetailsList } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { diffStringDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { $labelColor } from "utils/style/colors";
import { transition } from "utils/style/mixins";
import { $fontSizeH2 } from "utils/style/sizes";

const USER_TABLE_ROW_CURRENCY = "USD";

const StyledTableRow = styled(TableRow)`
  ${transition("background-color")}
`;

const AboutCell = styled(TableCell)`
  max-width: 350px;
`;

const About = styled(Row)`
  ${transition("opacity")};
  white-space: normal;
  color: ${$labelColor};
  line-height: ${$fontSizeH2}px;
`;

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
      ? about.split(" ").slice(0, 13).join(" ") + " ..."
      : about;

  const renderHidden = () => <Text muted>{t("Hidden")}</Text>;
  return (
    <StyledTableRow>
      <AboutCell>
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
            <About size={"small"}>{slicedAbout}</About>
          </RowItem>
        </Row>
      </AboutCell>
      <TableCell>
        {followers.length ? (
          <UserAvatarList count={followersCount} list={followers} />
        ) : (
          "0"
        )}
      </TableCell>
      <TableCell>{diffStringDate(regDate)}</TableCell>
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
      {/*<TableCell>
        {totalProfit === null ? (
          renderHidden()
        ) : (
          <NumberFormat
            value={formatCurrencyValue(totalProfit, USER_TABLE_ROW_CURRENCY)}
            suffix={` ${USER_TABLE_ROW_CURRENCY}`}
            displayType="text"
          />
        )}
      </TableCell>*/}
      {personalDetails && (
        <TableCell>
          <FollowUserButton
            wide={false}
            disabled={!personalDetails.allowFollow}
            size={"small"}
            id={userId}
            value={personalDetails.isFollow}
          />
        </TableCell>
      )}
    </StyledTableRow>
  );
};
