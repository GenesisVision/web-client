import { IImageValue } from "components/form/input-image/input-image";
import { ProgramUpdate } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import filesService from "services/file-service";

export const checkClosed = (status: string) => {
  switch (status) {
    case "Closed":
    case "Archived":
    case "Disabled":
      return true;
    default:
      return false;
  }
};

export const editAsset = ({
  editAssetData,
  id
}: {
  id: string;
  editAssetData: IAssetEditFormValues;
}): Promise<Response> => {
  let promise = Promise.resolve("");
  if (editAssetData.logo?.image?.cropped)
    promise = filesService.uploadFile(editAssetData.logo.image.cropped);
  return promise.then(response => {
    const body = {
      ...editAssetData,
      logo: response || editAssetData.logo.src
    } as ProgramUpdate;
    return api.assets().updateAsset(id, {
      body
    }); //TODO ask backend to change ProgramUpdate logo type
  });
};

export const closeProgram: TCloseAsset = ({ id, twoFactorCode }) => {
  return api.assets().closeInvestmentProgram(id, {
    body: { twoFactorCode: twoFactorCode! }
  });
};

export const closeFund: TCloseAsset = ({ id, twoFactorCode }) => {
  return api.assets().closeFund(id, {
    body: { twoFactorCode: twoFactorCode! }
  });
};

export const closeTradingExchangeAccount: TCloseAsset = ({ id }) => {
  return api.assets().closeExchangeAccount(id);
};

export const closeTradingAccount: TCloseAsset = ({ id }) => {
  return api.assets().closeTradingAccount(id);
};

export type TCloseAsset = (opts: {
  id: string;
  twoFactorCode?: string;
}) => Promise<any>;

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
