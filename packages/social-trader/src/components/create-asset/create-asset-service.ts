import {
  CancelablePromise,
  NewFundRequest
  // NewProgramRequest,
  // ProgramCreateResult
} from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import { ICreateProgramSettingsFormValues } from "pages/create-program/components/create-program-settings/create-program-settings";
import { ASSET } from "shared/constants/constants";
import assetsApi from "shared/services/api-client/assets-api";
//import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export type ICreateAssetSettingsFormValues =
  | ICreateProgramSettingsFormValues
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest = any; //NewFundRequest | NewProgramRequest;

export const createAsset = (
  createAssetData: ICreateAssetSettingsFormValues,
  asset: ASSET
): CancelablePromise<any> => {
  //TODO ProgramCreateResult | null
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

const getCreateMethod = (
  asset: ASSET
  // @ts-ignore
): ((request: NewAssetRequest) => CancelablePromise<any>) => {
  //TODO ProgramCreateResult | null
  switch (asset) {
    case "ACCOUNT" as ASSET:
      return (request: NewAssetRequest) => new CancelablePromise<any>(() => {});
    // return (request: NewAssetRequest) =>
    //   (Promise.resolve() as unknown) as CancelablePromise<
    //     ManagerProgramCreateResult
    //   >;
    case ASSET.PROGRAM:
      return (request: NewAssetRequest) => new CancelablePromise<any>(() => {});
    // assetsApi.createProgram(authService.getAuthArg(), {
    //   request: request //as NewProgramRequest
    // });
    default:
      return (request: NewAssetRequest) => new CancelablePromise<any>(() => {});
    // managerApi.createFund(authService.getAuthArg(), {
    //   request: request as NewFundRequest
    // });
  }
};

type TGetCreateMethodReturn = (
  request: NewAssetRequest
) => CancelablePromise<any>; //ProgramCreateResult
