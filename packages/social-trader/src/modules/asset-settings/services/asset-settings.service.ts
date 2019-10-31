import { push } from "connected-react-router";
import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import Router from "next/router";
import { Dispatch } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { RootState } from "shared/reducers/root-reducer";
import {
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_ROUTE
} from "shared/routes/programs.routes";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import getParams from "shared/utils/get-params";
import { ManagerThunk, ResponseError } from "shared/utils/types";

export const cancelChangeBrokerMethod = (
  programId: string
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .cancelChangeBroker(authService.getAuthArg(), {
      programId
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .changeBroker(authService.getAuthArg(), {
      request: { programId, newBrokerAccountTypeId, newLeverage }
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });

export const redirectToProgram = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const programSlugUrl = getParams(Router.pathname, PROGRAM_DETAILS_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  dispatch(push(`${PROGRAMS_ROUTE}/${programSlugUrl}`));
};

export const editAsset = (
  id: string,
  editAssetData: IAssetEditFormValues,
  type: ASSET
): ManagerThunk<CancelablePromise<void>> => dispatch => {
  const authorization = authService.getAuthArg();
  let data = editAssetData;
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (data.logo.image)
    promise = filesService.uploadFile(
      data.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;

  return promise
    .then(response => {
      data = {
        ...data,
        logo: response || data.logo.src
      };
      return managerApi.updateInvestmentProgram(id, authorization, {
        model: data as ProgramUpdate
      }); //TODO ask backend to change ProgramUpdate logo type
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          (type === ASSET.PROGRAM &&
            "manager.edit-program.notifications.edit-success") ||
            (type === ASSET.FUND &&
              "manager.edit-fund.notifications.edit-success") ||
            "",
          true
        )
      );
    })
    .catch(({ errorMessage }: { errorMessage: string }) =>
      dispatch(alertMessageActions.error(errorMessage))
    ) as CancelablePromise<void>;
};

export const closeProgram: TCloseAsset = ({
  onSuccess,
  onError,
  id,
  opts
}) => dispatch => {
  const authorization = authService.getAuthArg();
  managerApi
    .closeInvestmentProgram(id, authorization, opts)
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
}) => dispatch =>
  managerApi
    .closeFund(id, authService.getAuthArg(), opts)
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
