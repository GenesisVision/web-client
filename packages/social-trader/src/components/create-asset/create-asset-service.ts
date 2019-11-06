import {
  CancelablePromise,
  NewFundRequest,
  NewProgramRequest,
  ProgramCreateResult
} from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import { ICreateProgramSettingsFormValues } from "pages/create-program/components/create-program-settings/create-program-settings";
import { ASSET } from "shared/constants/constants";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export type ICreateAssetSettingsFormValues =
  | ICreateProgramSettingsFormValues
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest = NewFundRequest | NewProgramRequest;

export const createAsset = (
  createAssetData: ICreateAssetSettingsFormValues,
  asset: ASSET
): CancelablePromise<ProgramCreateResult | null> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if ("logo" in createAssetData && createAssetData.logo.image) {
    promise = filesService.uploadFile(
      createAssetData.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  }
  const method = getCreateMethod(asset);
  return promise.then(response =>
    method({
      ...createAssetData,
      logo: response
    } as NewAssetRequest)
  );
};

const getCreateMethod = (asset: ASSET): TGetCreateMethodReturn => {
  switch (asset) {
    case ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        (Promise.resolve() as unknown) as CancelablePromise<
          ManagerProgramCreateResult
        >;
    case ASSET.PROGRAM:
      return (request: NewAssetRequest) =>
        managerApi.createProgram(authService.getAuthArg(), {
          request: request as NewProgramRequest
        });
    case ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        managerApi.createFund(authService.getAuthArg(), {
          request: request as NewFundRequest
        });
  }
};

type TGetCreateMethodReturn = (
  request: NewAssetRequest
) => CancelablePromise<ProgramCreateResult>;
