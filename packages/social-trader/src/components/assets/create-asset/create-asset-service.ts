import { CREATE_ASSET } from "constants/constants";
import {
  MakeExchangeProgram,
  MakeProgram,
  NewExchangeAccountRequest,
  NewFundRequest,
  NewTradingAccountRequest
} from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateExchangeAccountSettingsFormValues } from "pages/create-account/components/create-exchange-account-settings/create-exchange-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import { api } from "services/api-client/swagger-custom-client";
import filesService from "services/file-service";
import { sendEventToGA } from "utils/ga";

export type ICreateAssetSettingsFormValues =
  | ICreateExchangeAccountSettingsFormValues
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest =
  | NewExchangeAccountRequest
  | NewFundRequest
  | NewTradingAccountRequest;

export const createAsset = ({
  data,
  asset
}: {
  data: ICreateAssetSettingsFormValues;
  asset: CREATE_ASSET;
}): Promise<any> => {
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo.image && data.logo.image.cropped) {
    promise = filesService.uploadFile(data.logo.image.cropped) as Promise<any>;
  }
  const method = getCreateMethod(asset);
  return promise
    .then(response =>
      method({
        ...data,
        logo: response
      } as NewAssetRequest)
    )
    .then(result => {
      if (result) {
        sendEventToGA({
          eventCategory: "Create",
          eventAction:
            asset === CREATE_ASSET.ACCOUNT
              ? data.depositAmount
                ? "CreateAccount"
                : "CreateDemoAccount"
              : "CreateFund"
        });
      }
      return result;
    });
};

const getCreateMethod = (
  asset: CREATE_ASSET
): ((request: NewAssetRequest) => Promise<any>) => {
  switch (asset) {
    case CREATE_ASSET.EXCHANGE_PROGRAM:
      return (request: NewAssetRequest) =>
        api.assets().makeExchangeProgram({
          body: request as MakeExchangeProgram
        });
    case CREATE_ASSET.PROGRAM:
      return (request: NewAssetRequest) =>
        api.assets().makeProgram({
          body: request as MakeProgram
        });
    case CREATE_ASSET.EXCHANGE_ACCOUNT:
      return (request: NewAssetRequest) =>
        api.assets().createExchangeAccount({
          body: request as NewExchangeAccountRequest
        });
    case CREATE_ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        api.assets().createTradingAccount({
          body: request as NewTradingAccountRequest
        });
    case CREATE_ASSET.SELF_MANAGED_FUND:
      return (request: NewAssetRequest) =>
        api.assets().createSelfManagedFund({
          body: request as NewFundRequest
        });
    case CREATE_ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        api.assets().createFund({
          body: request as NewFundRequest
        });
  }
};
