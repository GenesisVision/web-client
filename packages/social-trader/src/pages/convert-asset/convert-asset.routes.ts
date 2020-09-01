import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { TAssetFromTo } from "pages/convert-asset/convert-asset.types";
import { SLUG_URL_PARAM_NAME } from "routes/app.routes";
import replaceParams from "utils/replace-params";

export const MAKE_EXCHANGE_PROGRAM_FROM_PAGE_ROUTE =
  "/make-exchange-program-from-account";
export const MAKE_EXCHANGE_PROGRAM_FROM_PAGE_SLUG_ROUTE = `${MAKE_EXCHANGE_PROGRAM_FROM_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const composeMakeExchangeProgramFromAccountUrl = (
  slugUrl: string
): string =>
  replaceParams(`${MAKE_EXCHANGE_PROGRAM_FROM_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const MAKE_PROGRAM_FROM_SIGNAL_PAGE_ROUTE = "/make-program-from-signal";
export const MAKE_PROGRAM_FROM_SIGNAL_PAGE_SLUG_ROUTE = `${MAKE_PROGRAM_FROM_SIGNAL_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const composeMakeProgramFromSignalUrl = (slugUrl: string): string =>
  replaceParams(`${MAKE_PROGRAM_FROM_SIGNAL_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const MAKE_PROGRAM_FROM_ACCOUNT_PAGE_ROUTE =
  "/make-program-from-account";
export const MAKE_PROGRAM_FROM_ACCOUNT_PAGE_SLUG_ROUTE = `${MAKE_PROGRAM_FROM_ACCOUNT_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const composeMakeProgramFromAccountUrl = (slugUrl: string): string =>
  replaceParams(`${MAKE_PROGRAM_FROM_ACCOUNT_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const MAKE_SIGNAL_FROM_ACCOUNT_PAGE_ROUTE = "/make-signal-from-account";
export const MAKE_SIGNAL_FROM_ACCOUNT_PAGE_SLUG_ROUTE = `${MAKE_SIGNAL_FROM_ACCOUNT_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const composeMakeSignalFromAccountUrl = (slugUrl: string): string =>
  replaceParams(`${MAKE_SIGNAL_FROM_ACCOUNT_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const MAKE_SIGNAL_FROM_EXTERNAL_ACCOUNT_PAGE_ROUTE =
  "/make-signal-from-external";
export const MAKE_SIGNAL_FROM_EXTERNAL_ACCOUNT_PAGE_SLUG_ROUTE = `${MAKE_SIGNAL_FROM_EXTERNAL_ACCOUNT_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const composeMakeSignalFromEternalAccountUrl = (
  slugUrl: string
): string =>
  replaceParams(`${MAKE_SIGNAL_FROM_EXTERNAL_ACCOUNT_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const makeProgramLinkCreator = ({
  assetTo,
  assetFrom
}: TAssetFromTo) => {
  switch (assetFrom + assetTo) {
    case CONVERT_ASSET.EXCHANGE_ACCOUNT + CONVERT_ASSET.PROGRAM:
      return composeMakeExchangeProgramFromAccountUrl;
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return composeMakeProgramFromSignalUrl;
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return composeMakeProgramFromAccountUrl;
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.SIGNAL:
      return composeMakeSignalFromAccountUrl;
    case CONVERT_ASSET.EXTERNAL_ACCOUNT + CONVERT_ASSET.SIGNAL:
    default:
      return composeMakeSignalFromEternalAccountUrl;
  }
};
