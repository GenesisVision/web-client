import {
  MakeSignalProviderProgram,
  MakeTradingAccountProgram,
  MakeTradingAccountSignalProvider
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
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
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo.image && data.logo.image.cropped) {
    promise = filesService.uploadFile(data.logo.image.cropped) as Promise<any>;
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
  const assetsApi = api.assets();
  switch (assetFrom + assetTo) {
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return (body: RequestType) =>
        assetsApi.makeSignalProviderProgram({
          body: body as MakeSignalProviderProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return (body: RequestType) =>
        assetsApi.makeAccountProgram({
          body: body as MakeTradingAccountProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.SIGNAL:
      return (body: RequestType) =>
        assetsApi.makeAccountSignalProvider({
          body: body as MakeTradingAccountSignalProvider
        });
    case CONVERT_ASSET.EXTERNAL_ACCOUNT + CONVERT_ASSET.SIGNAL:
    default:
      return (body: RequestType) =>
        assetsApi.makeExternalAccountSignalProvider({
          body: body as MakeTradingAccountSignalProvider
        });
  }
};
