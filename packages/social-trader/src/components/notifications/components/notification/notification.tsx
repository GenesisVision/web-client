import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBaseElement from "components/avatar/image-base.element";
import Link, { LinkProps } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
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
  PROFILE = "Profile",
  PLATFORM = "Platform",
  SOCIAL = "Social",
  ASSET = "Asset",
  TRADING_ACCOUNT = "TradingAccount"
}

interface INotificationOwnProps {
  closeNotifications(): void;
}

interface IAssetAvatarContainerProps {
  type?: string;
}

interface INotificationProps
  extends NotificationViewModel,
  INotificationOwnProps,
  IAssetAvatarContainerProps { }

const getStaticIconUrl = (type: string): string | null => {
  switch (type) {
    case TYPE.PROFILE: {
      return RedUserIcon;
    }
    case TYPE.PLATFORM: {
      return NewsIcon;
    }
    default:
      return null;
  }
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
  background-color: ${({ type }) => {
    switch (type) {
      case TYPE.PROFILE: {
        return $negativeBackgroundColor;
      }
      case TYPE.PLATFORM: {
        return $labelColor;
      }
      default:
        return $labelColor;
    }
  }};
`;

const AssetAvatarLinkContainer = styled(Link) <IAssetAvatarContainerProps>`
  ${AssetAvatarContainerStyle}
`;

const AssetAvatarDivContainer = styled.div<IAssetAvatarContainerProps>`
  ${AssetAvatarContainerStyle}
`;

const _NotificationAssetAvatar: React.FC<INotificationProps> = ({
  type,
  closeNotifications,
  platformAssetDetails,
  userDetails,
  assetDetails
}) => {
  const logoUrl =
    assetDetails?.logoUrl ||
    userDetails?.logoUrl ||
    platformAssetDetails?.logoUrl;
  const { linkCreator } = useToLink();
  const Tag: React.ComponentType<LinkProps | any> | string = assetDetails?.url
    ? AssetAvatarLinkContainer
    : AssetAvatarDivContainer;
  const to = assetDetails?.url
    ? linkCreator(
      assetDetails?.assetType === "Program"
        ? composeProgramDetailsUrl(assetDetails?.url)
        : composeFundsDetailsUrl(assetDetails?.url),
      assetDetails?.assetType === "Program"
        ? PROGRAM_DETAILS_FOLDER_ROUTE
        : FUND_DETAILS_FOLDER_ROUTE
    )
    : null;
  return (
    <Tag to={to} onClick={closeNotifications} type={type}>
      <AssetAvatar url={logoUrl} alt={type} color={assetDetails?.color} />
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

const Date = styled(Row) <{ unread?: boolean }>`
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
  const { date, text, isUnread, type, location } = props;
  const staticIconUrl = getStaticIconUrl(type);

  return (
    <Container center={false}>
      <RowItem>
        {!location ? (
          <AssetAvatarDivContainer type={type}>
            <ImageBaseElement src={staticIconUrl} alt={type} />
          </AssetAvatarDivContainer>
        ) : (
            <NotificationAssetAvatar {...props} type={type} />
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
