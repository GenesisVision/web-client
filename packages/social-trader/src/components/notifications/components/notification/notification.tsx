import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBaseElement from "components/avatar/image-base.element";
import Link, { LinkProps } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import dayjs from "dayjs";
import { NotificationViewModel } from "gv-api-web";
import NewsIcon from "media/news.svg";
import RedUserIcon from "media/red-user.svg";
import * as React from "react";
import {
  FUND_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_FOLDER_ROUTE
} from "routes/invest.routes";
import styled, { css } from "styled-components";
import {
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";
import {
  $borderColor,
  $labelColor,
  $negativeBackgroundColor,
  $negativeColor
} from "utils/style/colors";
import {
  adaptiveMargin,
  adaptivePadding,
  fontSize,
  height,
  width
} from "utils/style/mixins";
import {
  $fontSizeCommon,
  $paddingXsmall,
  $paddingXxsmall
} from "utils/style/sizes";

enum TYPE {
  PROFILE = "profile",
  PLATFORM = "platform"
}

interface INotificationOwnProps {
  closeNotifications(): void;
}

interface IAssetAvatarContainerProps {
  dark?: boolean;
  light?: boolean;
}

type INotificationProps = NotificationViewModel &
  INotificationOwnProps &
  IAssetAvatarContainerProps;

const getStaticIconUrl = (type: string): string | null => {
  return type.indexOf(TYPE.PROFILE) !== -1
    ? RedUserIcon
    : type.indexOf(TYPE.PLATFORM) !== -1
    ? NewsIcon
    : null;
};

const AssetAvatarContainerStyle = css<IAssetAvatarContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
  ${height(32)};
  ${width(32)};
  background-color: ${({ dark, light }) => {
    if (dark) return $negativeBackgroundColor;
    if (light) return $labelColor;
    return $labelColor;
  }};
`;

const AssetAvatarLinkContainer = styled(Link)<IAssetAvatarContainerProps>`
  ${AssetAvatarContainerStyle}
`;

const AssetAvatarDivContainer = styled.div<IAssetAvatarContainerProps>`
  ${AssetAvatarContainerStyle}
`;

const _NotificationAssetAvatar: React.FC<INotificationProps> = ({
  dark,
  light,
  type,
  url,
  logoUrl,
  color,
  closeNotifications,
  assetType
}) => {
  const { linkCreator } = useToLink();
  const Tag: React.ComponentType<LinkProps | any> | string = url
    ? AssetAvatarLinkContainer
    : AssetAvatarDivContainer;
  const to = url
    ? linkCreator(
        assetType === "Program"
          ? composeProgramDetailsUrl(url)
          : composeFundsDetailsUrl(url),
        assetType === "Program"
          ? PROGRAM_DETAILS_FOLDER_ROUTE
          : FUND_DETAILS_FOLDER_ROUTE
      )
    : null;
  return (
    <Tag to={to} onClick={closeNotifications} dark={dark} light={light}>
      <AssetAvatar url={logoUrl} alt={type} color={color} />
    </Tag>
  );
};
const NotificationAssetAvatar = React.memo(_NotificationAssetAvatar);

const Container = styled(Row)`
  &:not(:last-child) {
    border-bottom: 1px solid ${$borderColor};
  }
`;

const Description = styled(Row)`
  ${fontSize($fontSizeCommon)};
  letter-spacing: 0.2px;
`;

const Date = styled(Row)<{ unread?: boolean }>`
  ${({ unread }) =>
    unread &&
    css`
      content: "\\25CF";
      color: ${$negativeColor};
      ${adaptiveMargin("left", $paddingXxsmall)};
    `};
`;

const Content = styled.div`
  line-height: 1.7;
  ${adaptivePadding("bottom", $paddingXsmall)};
`;

const _Notification: React.FC<INotificationProps> = props => {
  const { date, text, isUnread, type } = props;
  const staticIconUrl = getStaticIconUrl(type.toLowerCase());
  return (
    <Container center={false}>
      <RowItem>
        {staticIconUrl ? (
          <AssetAvatarDivContainer
            dark={type.toLowerCase().includes("profile")}
            light={type.toLowerCase().includes("platform")}
          >
            <ImageBaseElement src={staticIconUrl} alt={type} />
          </AssetAvatarDivContainer>
        ) : (
          <NotificationAssetAvatar
            {...props}
            dark={type.toLowerCase().includes("profile")}
            light={type.toLowerCase().includes("platform")}
          />
        )}
      </RowItem>

      <RowItem>
        <Content>
          <Description>{text}</Description>
          <Date unread={isUnread}>
            <Text muted>{dayjs(date).format("HH:mm")}</Text>
          </Date>
        </Content>
      </RowItem>
    </Container>
  );
};

const Notification = React.memo(_Notification);
export default Notification;
