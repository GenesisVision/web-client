import { CREATE_ASSET } from "constants/constants";
import { NewFundRequest, NewTradingAccountRequest } from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";

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
}): Promise<any> => {
  const authorization = authService.getAuthArg();
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo.image) {
    promise = filesService.uploadFile(
      data.logo.image.cropped,
      authorization
    ) as Promise<any>;
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
): ((request: NewAssetRequest) => Promise<any>) => {
  const authorization = authService.getAuthArg();
  switch (asset) {
    case CREATE_ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        assetsApi.createTradingAccount(authorization, {
          body: request as NewTradingAccountRequest
        });
    case CREATE_ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        assetsApi.createFund(authorization, {
          body: request as NewFundRequest
        });
  }
};
