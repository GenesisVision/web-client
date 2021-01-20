import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import dayjs from "dayjs";
import {
  NotificationLocationViewModel,
  NotificationViewModel
} from "gv-api-web";
import NewsIcon from "media/news.svg";
import RedUserIcon from "media/red-user.svg";
import * as React from "react";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { composePostDetailsUrl, MEDIA_ROUTE } from "routes/social.routes";
import styled, { css } from "styled-components";
import {
  composeAccountDetailsUrl,
  composeFollowDetailsUrl,
  composeFundsDetailsUrl,
  composeManagerDetailsUrl,
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
  TRADING_ACCOUNT = "TradingAccount",
  USER = "User",
  SIGNAL = "Signal",
  PLATFORM_ASSET = "PlatformAsset"
}

enum LINKS {
  TRADING_ACCOUNT = "TradingAccount",
  USER = "User",
  PROGRAM = "Program",
  DASHBOARD = "Dashboard",
  SOCIAL_POST = "SocialPost",
  FOLLOW = "Follow",
  FUND = "Fund",
  SOCIAL_MEDIA_POST = "SocialMediaPost"
}

interface INotificationOwnProps {
  closeNotifications(): void;
}

interface IAssetAvatarContainerProps {
  type: string;
}

interface INotificationProps
  extends NotificationViewModel,
  INotificationOwnProps { }

interface INotificationAssetAvatarProps extends INotificationProps {
  color: string;
  logoUrl: string;
}

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

const getColor = (type: string): string => {
  switch (type) {
    case TYPE.PROFILE: {
      return "#D6CE93";
    }
    case TYPE.PLATFORM: {
      return "#D8A48F";
    }
    case TYPE.ASSET: {
      return "#6AB547";
    }
    case TYPE.SOCIAL: {
      return "#EDD83D";
    }
    case TYPE.TRADING_ACCOUNT: {
      return "#e81652";
    }
    case TYPE.USER: {
      return "#4381C1";
    }
    case TYPE.SIGNAL: {
      return "#FF7D00";
    }
    case TYPE.PLATFORM_ASSET: {
      return "#3BF4FB";
    }
    default:
      return "#FFFFFF";
  }
};

const getLink = (location: NotificationLocationViewModel): string => {
  const { id } = location;
  switch (location?.location) {
    case LINKS.TRADING_ACCOUNT: {
      return composeAccountDetailsUrl(id);
    }
    case LINKS.DASHBOARD: {
      return DASHBOARD_ROUTE;
    }
    case LINKS.FOLLOW: {
      return composeFollowDetailsUrl(id);
    }
    case LINKS.PROGRAM: {
      return composeProgramDetailsUrl(id);
    }
    case LINKS.SOCIAL_POST: {
      return composePostDetailsUrl(id);
    }
    case LINKS.USER: {
      return composeManagerDetailsUrl(id);
    }
    case LINKS.FUND: {
      return composeFundsDetailsUrl(id);
    }
    case LINKS.SOCIAL_MEDIA_POST: {
      return MEDIA_ROUTE;
    }
    default:
      return "";
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

const _NotificationAssetAvatar: React.FC<INotificationAssetAvatarProps> = ({
  type,
  closeNotifications,
  color,
  logoUrl,
  location
}) => {
  const { linkCreator } = useToLink();
  const to = location.externalUrl || linkCreator(getLink(location));

  return (
    <AssetAvatarLinkContainer to={to} onClick={closeNotifications} type={type}>
      <AssetAvatar url={logoUrl} alt={type} color={color} />
    </AssetAvatarLinkContainer>
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
  const {
    imageUrl,
    assetDetails,
    userDetails,
    platformAssetDetails,
    date,
    text,
    isUnread,
    type,
    location
  } = props;

  const logoUrl: string =
    assetDetails?.logoUrl ||
    userDetails?.logoUrl ||
    platformAssetDetails?.logoUrl ||
    imageUrl;
  const staticIconUrl = getStaticIconUrl(type);
  const color: string =
    assetDetails?.color || platformAssetDetails?.color || getColor(type);

  return (
    <Container center={false}>
      <RowItem>
        {!location ? (
          <AssetAvatarDivContainer type={type}>
            {staticIconUrl ? (
              <ImageBaseElement src={staticIconUrl} alt={type} />
            ) : (
                <AssetAvatar url={logoUrl} color={color} alt={type} />
              )}
          </AssetAvatarDivContainer>
        ) : (
            <NotificationAssetAvatar {...props} logoUrl={logoUrl} color={color} />
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
