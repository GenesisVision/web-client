import { IImageValue } from "components/form/input-image/input-image";
import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";

export const editAsset = ({
  editAssetData,
  id
}: {
  id: string;
  editAssetData: IAssetEditFormValues;
}): CancelablePromise<null> => {
  const authorization = authService.getAuthArg();
  let promise = (Promise.resolve("") as unknown) as CancelablePromise<any>;
  if (editAssetData.logo.image)
    promise = filesService.uploadFile(
      editAssetData.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  return promise.then(response => {
    const model = {
      ...editAssetData,
      logo: response || editAssetData.logo.src
    };
    return assetsApi.updateAsset(id, authorization, {
      model: model as ProgramUpdate
    }); //TODO ask backend to change ProgramUpdate logo type
  });
};

export const closeProgram: TCloseAsset = ({ id, twoFactorCode }) => {
  return assetsApi.closeInvestmentProgram(id, authService.getAuthArg(), {
    model: { twoFactorCode: twoFactorCode! }
  });
};

export const closeFund: TCloseAsset = ({ id, twoFactorCode }) => {
  return assetsApi.closeFund(id, authService.getAuthArg(), {
    model: { twoFactorCode: twoFactorCode! }
  });
};

export const closeTradingAccount: TCloseAsset = ({ id }) => {
  return assetsApi.closeTradingAccount(id, authService.getAuthArg());
};

export type TCloseAsset = (opts: {
  id: string;
  twoFactorCode?: string;
}) => void;

export enum ASSET_EDIT_FIELDS {
  stopOutLevel = "stopOutLevel",
  title = "title",
  description = "description",
  logo = "logo",
  investmentLimit = "investmentLimit",
  hasInvestmentLimit = "hasInvestmentLimit"
}

export interface IAssetEditFormValues {
  [ASSET_EDIT_FIELDS.title]: string;
  [ASSET_EDIT_FIELDS.description]: string;
  [ASSET_EDIT_FIELDS.logo]: IImageValue;
  [ASSET_EDIT_FIELDS.stopOutLevel]: number;
  [ASSET_EDIT_FIELDS.investmentLimit]: number | null;
}
