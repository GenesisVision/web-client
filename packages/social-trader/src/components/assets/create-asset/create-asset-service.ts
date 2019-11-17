import {
  CancelablePromise,
  NewFundRequest,
  NewTradingAccountRequest
} from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import { CREATE_ASSET } from "shared/constants/constants";
import assetsApi from "shared/services/api-client/assets-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export type ICreateAssetSettingsFormValues =
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest = NewFundRequest | NewTradingAccountRequest;

export const createAsset = ({
  data,
  asset
}: {
  data: ICreateAssetSettingsFormValues;
  asset: CREATE_ASSET;
}): CancelablePromise<any> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if ("logo" in data && data.logo.image) {
    promise = filesService.uploadFile(
      data.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  }
  const method = getCreateMethod(asset);
  return promise.then(response =>
    method({
      ...data,
      logo: response
    } as NewAssetRequest)
  );
};

const getCreateMethod = (
  asset: CREATE_ASSET
): ((request: NewAssetRequest) => CancelablePromise<any>) => {
  const authorization = authService.getAuthArg();
  switch (asset) {
    case CREATE_ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        assetsApi.createTradingAccount(authorization, {
          request: request as NewTradingAccountRequest
        });
    case CREATE_ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        assetsApi.createFund(authorization, {
          request: request as NewFundRequest
        });
  }
};

type TGetCreateMethodReturn = (
  request: NewAssetRequest
) => CancelablePromise<any>; //ProgramCreateResult
