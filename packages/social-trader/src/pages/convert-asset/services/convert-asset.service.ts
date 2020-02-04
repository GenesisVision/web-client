import {
  MakeSignalProviderProgram,
  MakeTradingAccountProgram,
  MakeTradingAccountSignalProvider
} from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";

import { CONVERT_ASSET } from "../convert-asset.contants";
import { TAssetFromTo } from "../convert-asset.types";

export type IConvertAssetSettingsFormValues = any;

export type RequestType =
  | MakeSignalProviderProgram
  | MakeTradingAccountProgram
  | MakeTradingAccountSignalProvider;

export const convertAsset = ({
  data,
  fromTo
}: {
  data: IConvertAssetSettingsFormValues;
  fromTo: TAssetFromTo;
}): Promise<any> => {
  const authorization = authService.getAuthArg();
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo.image) {
    promise = filesService.uploadFile(
      data.logo.image.cropped,
      authorization
    ) as Promise<any>;
  }
  const method = getCovertMethod(fromTo);
  return promise.then(response =>
    method({
      ...data,
      logo: response
    } as RequestType)
  );
};

const getCovertMethod = ({
  assetFrom,
  assetTo
}: TAssetFromTo): ((body: RequestType) => Promise<any>) => {
  const authorization = authService.getAuthArg();
  switch (assetFrom + assetTo) {
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return (body: RequestType) =>
        assetsApi.makeSignalProviderProgram(authorization, {
          body: body as MakeSignalProviderProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return (body: RequestType) =>
        assetsApi.makeAccountProgram(authorization, {
          body: body as MakeTradingAccountProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.SIGNAL:
      return (body: RequestType) =>
        assetsApi.makeAccountSignalProvider(authorization, {
          body: body as MakeTradingAccountSignalProvider
        });
    case CONVERT_ASSET.EXTERNAL_ACCOUNT + CONVERT_ASSET.SIGNAL:
    default:
      return (body: RequestType) =>
        assetsApi.makeExternalAccountSignalProvider(authorization, {
          body: body as MakeTradingAccountSignalProvider
        });
  }
};
