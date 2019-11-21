import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { fetchWallets } from "components/wallet/services/wallet.services";
import { AmountWithCurrency, ProgramMinInvestAmount } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import investmentsApi from "shared/services/api-client/investments-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, ReduxDispatch } from "utils/types";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs
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

export const programInvest: TAssetDeposit = ({
  id,
  amount,
  currency,
  walletId
}: TAssetInvestCreatorArgs) => (dispatch: ReduxDispatch) => {
  return investmentsApi
    .investIntoProgram(id, authService.getAuthArg(), {
      walletId,
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
