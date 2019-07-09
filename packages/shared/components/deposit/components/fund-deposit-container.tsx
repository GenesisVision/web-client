import { FundInvestInfo } from "gv-api-web";
import React, { useCallback } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import useErrorMessage from "shared/hooks/error-message.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import {
  fundInvestCreator,
  getFundInfoCreator
} from "../services/fund-deposit.service";
import DepositPopup from "./deposit-popup";

const _FundDepositContainer: React.FC<Props> = ({
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  fetchInfo,
  service,
  onApply
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleInvest = useCallback(
    (amount: number, currency: string, setSubmitting: SetSubmittingType) => {
      service
        .fundInvest(id, amount, currency)
        .then(() => {
          onApply();
          onClose();
        })
        .catch(error => {
          setErrorMessage(error);
          setSubmitting(false);
        });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopup
        hasEntryFee={hasEntryFee}
        asset={ASSET.FUND}
        currency={currency}
        id={id}
        fetchInfo={getFundInfoCreator(fetchInfo)}
        invest={handleInvest}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  currency: currencySelector(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      fundInvest: fundInvestCreator(props.fundInvest)
    },
    dispatch
  )
});

const FundDepositContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundDepositContainer);
export default FundDepositContainer;

interface OwnProps extends IDialogProps {
  id: string;
  hasEntryFee?: boolean;
  onApply(): void;
  fetchInfo(
    id: string,
    currency: string,
    authorization: string
  ): Promise<FundInvestInfo>;
  fundInvest(
    id: string,
    amount: number,
    authorization: string,
    opts: {
      currency: string;
    }
  ): Promise<void>;
}

interface StateProps {
  currency: string;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fundInvest: ReturnType<typeof fundInvestCreator>;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, StateProps, DispatchProps {}
