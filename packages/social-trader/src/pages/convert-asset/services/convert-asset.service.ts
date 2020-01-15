import {
  Broker,
  MakeSignalProviderProgram,
  MakeTradingAccountProgram,
  MakeTradingAccountSignalProvider
} from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";
import { getRandomInteger, getRandomWord, getRandomWords } from "utils/helpers";

import { CONVERT_ASSET } from "../convert-asset.contants";
import { TAssetFromTo } from "../convert-asset.types";

export type IConvertAssetSettingsFormValues = any;

export type RequestType =
  | MakeSignalProviderProgram
  | MakeTradingAccountProgram
  | MakeTradingAccountSignalProvider
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

type TGetConvertMethodReturn = (request: RequestType) => Promise<any>; //ProgramCreateResult

export const getBrokerLoaderData: () => any = () => ({
  name: getRandomWord(),
  description: getRandomWords(11),
  logo: "",
  terms: getRandomWord(),
  assets: getRandomWord(),
  fee: getRandomInteger(),
  leverageMin: getRandomInteger(),
  leverageMax: getRandomInteger(),
  accountTypes: [
    {
      id: getRandomWord(),
      name: getRandomWord(),
      description: getRandomWords(11),
      type: "MetaTrader4",
      leverages: [10],
      currencies: ["GVT"],
      minimumDepositsAmount: {},
      isForex: false,
      isSignalsAvailable: false
    }
  ],
  isForex: false,
  isSignalsAvailable: false,
  tags: [
    {
      name: "ANYANY",
      color: "#FFF"
    }
  ]
});
export const convertAssetBrokerLoaderData: Broker[] = new Array(7)
  .fill("")
  .map(getBrokerLoaderData);
