import {
  CancelablePromise,
  NewFundRequest,
  NewProgramRequest,
  ProgramCreateResult} from "gv-api-web";
import { ASSET } from "shared/constants/constants";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { ICreateFundSettingsFormValues } from "../../pages/create-fund/components/create-fund-settings/create-fund-settings";
import { ICreateProgramSettingsFormValues } from "../../pages/create-program/components/create-program-settings/create-program-settings";

export type ICreateAssetSettingsFormValues =
  | ICreateProgramSettingsFormValues
  | ICreateFundSettingsFormValues;

export type NewAssetRequest = NewFundRequest | NewProgramRequest;

export const createAsset = (
  createAssetData: ICreateAssetSettingsFormValues,
  asset: ASSET
): CancelablePromise<ProgramCreateResult | null> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (createAssetData.logo.image) {
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
): ((
  request: NewAssetRequest
) => CancelablePromise<ProgramCreateResult | null>) => {
  switch (asset) {
    case ASSET.PROGRAM:
      return (request: NewAssetRequest) =>
        managerApi.createProgram(authService.getAuthArg(), {
          request: request as NewProgramRequest
        });
    case ASSET.FUND:
      return (request: NewAssetRequest) =>
        managerApi.createFund(authService.getAuthArg(), {
          request: request as NewFundRequest
        });
  }
};
