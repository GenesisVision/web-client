import { ToType } from "components/link/link";
import { createToUrl } from "components/link/link.helper";
import {
  FOLLOW_NOTIFICATIONS_FOLDER_ROUTE,
  FOLLOW_NOTIFICATIONS_ROUTE,
  FUND_NOTIFICATIONS_FOLDER_ROUTE,
  FUND_NOTIFICATIONS_ROUTE,
  PROGRAM_NOTIFICATIONS_FOLDER_ROUTE,
  PROGRAM_NOTIFICATIONS_ROUTE
} from "components/notifications/notifications.routes";
import { ASSET } from "constants/constants";
import { AssetType, AssetTypeExt } from "gv-api-web";
import {
  ACCOUNT_API_KEYS,
  ACCOUNT_API_KEYS_FOLDER_ROUTE,
  ACCOUNT_DETAILS_ROUTE,
  ACCOUNT_SETTINGS
} from "routes/accounts.routes";
import { SLUG_URL_PARAM_NAME } from "routes/app.routes";
import {
  FUND_BANNER_ROUTE,
  FUND_DETAILS_FOLDER_ROUTE,
  FUND_DETAILS_ROUTE,
  FUND_SETTINGS,
  FUNDS_FACET_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "routes/funds.routes";
import {
  FOLLOW_DETAILS_FOLDER_ROUTE,
  FOLLOW_DETAILS_SLUG_ROUTE,
  FOLLOW_FACET_ROUTE,
  FUND_SETTINGS_FOLDER_ROUTE,
  PROGRAM_SETTINGS_FOLDER_ROUTE,
  SETTINGS
} from "routes/invest.routes";
import {
  MANAGER_DETAILS_ROUTE,
  MANAGER_SLUG_URL_PARAM_NAME
} from "routes/manager.routes";
import {
  PROGRAM_API_KEYS,
  PROGRAM_API_KEYS_FOLDER_ROUTE,
  PROGRAM_BANNER_ROUTE,
  PROGRAM_BANNERS_ROUTE,
  PROGRAM_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SETTINGS,
  PROGRAMS_FACET_ROUTE
} from "routes/programs.routes";
import { POST_PREVIEW_IMAGE_ROUTE } from "routes/social.routes";

import replaceParams from "./replace-params";

export const composeUrl = (route: string, slugParamName: string) => (
  slugUrl: string
) =>
  replaceParams(route, {
    [slugParamName]: slugUrl
  });

export const composeAssetDetailsUrl = (
  assetType: AssetTypeExt | AssetType,
  slugUrl: string
): string => {
  switch (assetType) {
    case "SelfManagedFund":
    case "Fund":
      return composeFundsDetailsUrl(slugUrl);
    case "Program":
      return composeProgramDetailsUrl(slugUrl);
    case "SignalProgram":
    default:
      return composeFollowDetailsUrl(slugUrl);
  }
};

export const composePostPreviewImageUrl = (slugUrl: string): string =>
  replaceParams(POST_PREVIEW_IMAGE_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeAccountDetailsUrl = (slugUrl: string): string =>
  replaceParams(ACCOUNT_DETAILS_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFollowDetailsUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_DETAILS_SLUG_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramDetailsUrl = (slugUrl: string): string =>
  replaceParams(PROGRAM_DETAILS_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramBannerUrl = (
  slugUrl: string,
  origin?: string
): string =>
  replaceParams(
    origin ? `${origin}${PROGRAM_BANNER_ROUTE}` : PROGRAM_BANNER_ROUTE,
    {
      [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
    }
  );

export const composeFundBannerUrl = (slugUrl: string): string =>
  replaceParams(FUND_BANNER_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramBannersUrl = (slugUrl: string): string =>
  replaceParams(PROGRAM_BANNERS_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeManagerDetailsUrl = (slugUrl: string): string =>
  replaceParams(MANAGER_DETAILS_ROUTE, {
    [`:${MANAGER_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundsDetailsUrl = (slugUrl: string): string =>
  replaceParams(FUND_DETAILS_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramNotificationsUrl = (slugUrl: string): string =>
  replaceParams(PROGRAM_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeProgramSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${PROGRAM_DETAILS_ROUTE}/${PROGRAM_SETTINGS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeAccountSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${ACCOUNT_DETAILS_ROUTE}/${ACCOUNT_SETTINGS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFollowNotificationsUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeFollowSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${FOLLOW_DETAILS_SLUG_ROUTE}/${SETTINGS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeAssetNotificationsUrl = (
  slugUrl: string,
  asset: ASSET
): string =>
  replaceParams(
    asset === ASSET.PROGRAM
      ? PROGRAM_NOTIFICATIONS_ROUTE
      : FUND_NOTIFICATIONS_ROUTE,
    {
      ":id": slugUrl
    }
  );

export const composeFundNotificationsUrl = (slugUrl: string): string =>
  replaceParams(FUND_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeFundSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${FUND_DETAILS_ROUTE}/${FUND_SETTINGS}`, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFollowFacetUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_FACET_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramFacetUrl = (slugUrl: string): string =>
  replaceParams(PROGRAMS_FACET_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundFacetUrl = (slugUrl: string): string =>
  replaceParams(FUNDS_FACET_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const createFundSettingsToUrl = (url: string, title: string): ToType =>
  createToUrl(composeFundSettingsUrl(url), FUND_SETTINGS_FOLDER_ROUTE, title);

export const createProgramSettingsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeProgramSettingsUrl(url),
    PROGRAM_SETTINGS_FOLDER_ROUTE,
    title
  );

export const createFundNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeFundNotificationsUrl(url),
    FUND_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const createProgramNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeProgramNotificationsUrl(url),
    PROGRAM_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const createFollowNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeFollowNotificationsUrl(url),
    FOLLOW_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const getAssetLink = (
  url: string,
  assetType: AssetType,
  title: string
): ToType => {
  switch (assetType) {
    case "Follow":
      return createToUrl(
        composeFollowDetailsUrl(url),
        FOLLOW_DETAILS_FOLDER_ROUTE,
        title
      );
    case "Fund":
      return createToUrl(
        composeFundsDetailsUrl(url),
        FUND_DETAILS_FOLDER_ROUTE,
        title
      );
    case "Program":
    default:
      return createToUrl(
        composeProgramDetailsUrl(url),
        PROGRAM_DETAILS_FOLDER_ROUTE,
        title
      );
  }
};

export const composeAccountApiKeysUrl = (slugUrl: string): string =>
  replaceParams(`${ACCOUNT_DETAILS_ROUTE}/${ACCOUNT_API_KEYS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const createAccountApiKeysToUrl = (url: string, title: string): ToType =>
  createToUrl(
    composeAccountApiKeysUrl(url),
    ACCOUNT_API_KEYS_FOLDER_ROUTE,
    title
  );

export const composeProgramApiKeysUrl = (slugUrl: string): string =>
  replaceParams(`${PROGRAM_DETAILS_ROUTE}/${PROGRAM_API_KEYS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const createProgramApiKeysToUrl = (url: string, title: string): ToType =>
  createToUrl(
    composeProgramApiKeysUrl(url),
    PROGRAM_API_KEYS_FOLDER_ROUTE,
    title
  );
