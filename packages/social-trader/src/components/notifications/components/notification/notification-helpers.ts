import { NotificationLocationViewModel } from "gv-api-web";
import NewsIcon from "media/news.svg";
import RedUserIcon from "media/red-user.svg";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { composePostDetailsUrl, MEDIA_ROUTE } from "routes/social.routes";
import {
  composeAccountDetailsUrl,
  composeFollowDetailsUrl,
  composeFundsDetailsUrl,
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";
import {
  $notificationAssetColor,
  $notificationDefaultColor,
  $notificationPlatformAssetColor,
  $notificationPlatformColor,
  $notificationProfileColor,
  $notificationSignalColor,
  $notificationSocialColor,
  $notificationTradingAccountColor,
  $notificationUserColor
} from "utils/style/colors";

import { LINKS, TYPE } from "./notification";

export const getStaticIconUrl = (type: string): string | null => {
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

export const getLink = (location: NotificationLocationViewModel): string => {
  const { id } = location;
  switch (location.location) {
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

export const getColor = (type: string): string => {
  switch (type) {
    case TYPE.PROFILE: {
      return $notificationProfileColor;
    }
    case TYPE.PLATFORM: {
      return $notificationPlatformColor;
    }
    case TYPE.ASSET: {
      return $notificationAssetColor;
    }
    case TYPE.SOCIAL: {
      return $notificationSocialColor;
    }
    case TYPE.TRADING_ACCOUNT: {
      return $notificationTradingAccountColor;
    }
    case TYPE.USER: {
      return $notificationUserColor;
    }
    case TYPE.SIGNAL: {
      return $notificationSignalColor;
    }
    case TYPE.PLATFORM_ASSET: {
      return $notificationPlatformAssetColor;
    }
    default:
      return $notificationDefaultColor;
  }
};
