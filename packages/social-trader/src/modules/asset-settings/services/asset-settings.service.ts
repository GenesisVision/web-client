import { IImageValue } from "components/form/input-image/input-image";
import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { Dispatch } from "redux";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";
import { ASSET } from "shared/constants/constants";

export const editAsset = (props: {
  id: string;
  editAssetData: IAssetEditFormValues;
  type: ASSET;
}): CancelablePromise<null> => {
  const authorization = authService.getAuthArg();
  let data = props.editAssetData;
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (data.logo.image)
    promise = filesService.uploadFile(
      data.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  return promise.then(response => {
    const model = {
      ...data,
      logo: response || data.logo.src
    };
    switch (props.type) {
      case ASSET.PROGRAM:
        return assetsApi.updateAsset_1(props.id, authorization, {
          model: model as ProgramUpdate
        }); //TODO ask backend to change ProgramUpdate logo type
      case ASSET.FOLLOW:
      case ASSET.FUND:
        return assetsApi.updateAsset(props.id, authorization, {
          model: model as ProgramUpdate
        }); //TODO ask backend to change ProgramUpdate logo type
    }
  });
};

export const closeProgram: TCloseAsset = ({
  onSuccess,
  onError,
  id,
  opts
}) => dispatch => {
  const authorization = authService.getAuthArg();
  const model =
    opts && opts.twoFactorCode
      ? {
          twoFactorCode: opts.twoFactorCode
        }
      : undefined;

  assetsApi
    .closeInvestmentProgram(id, authorization, {
      model
    })
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.description.close-program-notification-success",
          true
        )
      );
    })
    .catch((error: { errorMessage: string }) => {
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const closeFund: TCloseAsset = ({
  onSuccess,
  onError,
  id,
  opts
}) => dispatch => {
  const authorization = authService.getAuthArg();
  const model =
    opts && opts.twoFactorCode
      ? {
          twoFactorCode: opts.twoFactorCode
        }
      : undefined;

  assetsApi
    .closeFund(id, authorization, {
      model
    })
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "fund-details-page.description.close-fund-notification-success",
          true
        )
      );
    })
    .catch((error: { errorMessage: string }) => {
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export type TCloseAsset = (opts: {
  onSuccess: () => void;
  onError: () => void;
  id: string;
  opts?: {
    twoFactorCode?: string;
  };
}) => (dispatch: Dispatch) => void;

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
