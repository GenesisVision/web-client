import {
  CancelablePromise,
  NewFundRequest,
  ProgramRequestOld,
  TradingAccountCreateResult
} from "gv-api-web";
import { ASSET } from "shared/constants/constants";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { ICreateFundSettingsFormValues } from "../../pages/create-fund/components/create-fund-settings/create-fund-settings";
import { ICreateProgramSettingsFormValues } from "../../pages/create-program/components/create-program-settings/create-program-settings";

export type ICreateAssetSettingsFormValues =
  | ICreateProgramSettingsFormValues
  | ICreateFundSettingsFormValues;

export type NewAssetRequest = NewFundRequest | ProgramRequestOld;

export const createAsset = (
  createAssetData: ICreateAssetSettingsFormValues,
  asset: ASSET
): CancelablePromise<TradingAccountCreateResult> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (createAssetData.logo.image) {
    promise = filesService.uploadFile(
      createAssetData.logo.image.cropped,
      authorization
    );
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
) => CancelablePromise<TradingAccountCreateResult>) => {
  switch (asset) {
    case ASSET.PROGRAM:
      return (request: NewAssetRequest) =>
        // @ts-ignore
        managerApi.createProgram(authService.getAuthArg(), {
          request: request as ProgramRequestOld
        });
    case ASSET.FUND:
      // @ts-ignore
      return (request: NewAssetRequest) =>
        managerApi.createFund(authService.getAuthArg(), {
          request: request as NewFundRequest
        });
  }
};
