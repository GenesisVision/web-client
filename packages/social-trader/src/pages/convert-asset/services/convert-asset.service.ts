import faker from "faker";
import {
  Broker,
  CancelablePromise,
  MakeSignalProviderProgram,
  MakeTradingAccountProgram,
  MakeTradingAccountSignalProvider
} from "gv-api-web";
import assetsApi from "shared/services/api-client/assets-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { CONVERT_ASSET } from "../convert-asset.contants";
import { TAssetFromTo } from "../convert-asset.types";

export type IConvertAssetSettingsFormValues = any;

export type RequestType =
  | MakeSignalProviderProgram
  | MakeTradingAccountProgram
  | MakeTradingAccountSignalProvider
  | MakeTradingAccountSignalProvider;

export const convertAsset = (
  convertAssetData: IConvertAssetSettingsFormValues,
  fromTo: TAssetFromTo
): CancelablePromise<any> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if ("logo" in convertAssetData && convertAssetData.logo.image) {
    promise = filesService.uploadFile(
      convertAssetData.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  }
  const method = getCovertMethod(fromTo);
  return promise.then(response =>
    method({
      ...convertAssetData,
      logo: response
    } as RequestType)
  );
};

const getCovertMethod = ({
  assetFrom,
  assetTo
}: TAssetFromTo): ((request: RequestType) => CancelablePromise<any>) => {
  const authorization = authService.getAuthArg();
  switch (assetFrom + assetTo) {
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return (request: RequestType) =>
        assetsApi.makeSignalProviderProgram(authorization, {
          request: request as MakeSignalProviderProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return (request: RequestType) =>
        assetsApi.makeAccountProgram(authorization, {
          request: request as MakeTradingAccountProgram
        });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.SIGNAL:
      return (request: RequestType) =>
        assetsApi.makeAccountSignalProvider(authorization, {
          request: request as MakeTradingAccountSignalProvider
        });
    case CONVERT_ASSET.EXTERNAL_ACCOUNT + CONVERT_ASSET.SIGNAL:
    default:
      return (request: RequestType) =>
        assetsApi.makeExternalAccountSignalProvider(authorization, {
          request: request as MakeTradingAccountSignalProvider
        });
  }
};

type TGetConvertMethodReturn = (request: RequestType) => CancelablePromise<any>; //ProgramCreateResult

export const getBrokerLoaderData: () => any = () => ({
  name: faker.lorem.word(),
  description: faker.lorem.words(11),
  logo: "",
  terms: faker.lorem.word(),
  assets: faker.lorem.word(),
  fee: faker.random.number(),
  leverageMin: faker.random.number(),
  leverageMax: faker.random.number(),
  accountTypes: [
    {
      id: faker.lorem.word(),
      name: faker.lorem.word(),
      description: faker.lorem.words(11),
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
