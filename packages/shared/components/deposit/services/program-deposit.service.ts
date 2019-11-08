import { AmountWithCurrency, ProgramMinInvestAmount } from "gv-api-web";
import { Dispatch } from "redux";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import investmentsApi from "../../../services/api-client/investments-api";
import { CurrencyEnum, ReduxDispatch } from "../../../utils/types";
import {
  TAssetDeposit,
  TAssetInvestCreator,
  TAssetInvestCreatorArgs,
  TGetAssetInfoCreator
} from "../components/deposit.types";

export const getMinProgramDeposit = (
  amounts: ProgramMinInvestAmount[],
  cur: CurrencyEnum,
  broker: string
): number =>
  amounts
    .find(({ serverType }) => serverType === broker)!
    .minInvestAmountIntoProgram.find(({ currency }) => currency === cur)!
    .amount;

export const getFundMinDeposit = (
  amounts: AmountWithCurrency[],
  cur: CurrencyEnum
): number => amounts.find(({ currency }) => currency === cur)!.amount;

export const getProgramInfoCreator: TGetAssetInfoCreator = getProgramInfoFn => (
  id,
  currency
) => getProgramInfoFn(id, currency, authService.getAuthArg());

export const programInvestCreator: TAssetInvestCreator = programInvestFn => ({
  id,
  amount,
  currency
}) => dispatch => {
  return programInvestFn(id, authService.getAuthArg(), {
    amount,
    currency
  }).then(() => {
    dispatch(
      alertMessageActions.success(
        "deposit-asset.program.success-alert-message",
        true
      )
    );
    dispatch(fetchWallets(currency));
    dispatch(fetchProfileHeaderInfoAction());
  });
};

export const programInvest: TAssetDeposit = ({
  id,
  amount,
  currency
}: TAssetInvestCreatorArgs) => (dispatch: ReduxDispatch) => {
  return investmentsApi
    .investIntoProgram(id, authService.getAuthArg(), {
      amount
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "deposit-asset.program.success-alert-message",
          true
        )
      );
      // @ts-ignore
      dispatch(fetchWallets(currency));
      dispatch(fetchProfileHeaderInfoAction());
    });
};
