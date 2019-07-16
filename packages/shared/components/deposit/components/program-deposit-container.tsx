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
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import {
  getProgramInfoCreator,
  programInvestCreator
} from "../services/program-deposit.service";
import DepositPopup from "./deposit-popup";

const _ProgramDepositContainer: React.FC<Props> = ({
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
        .programInvest(id, amount, currency)
        .then(onApply)
        .then(onClose)
        .catch(setErrorMessage)
        .finally(() => {
          setSubmitting(false);
        });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopup
        asset={ASSET.PROGRAM}
        hasEntryFee={hasEntryFee}
        currency={currency}
        id={id}
        fetchInfo={getProgramInfoCreator(fetchInfo)}
        invest={handleInvest}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      programInvest: programInvestCreator(props.programInvest)
    },
    dispatch
  )
});

const ProgramDepositContainer = compose<React.ComponentType<OwnProps>>(
  connect<null, DispatchProps, OwnProps, RootState>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramDepositContainer);
export default ProgramDepositContainer;

interface OwnProps extends IDialogProps {
  id: string;
  hasEntryFee?: boolean;
  currency: string;
  onApply(): void;
  fetchInfo(
    id: string,
    currency: string,
    authorization: string
  ): Promise<FundInvestInfo>;
  programInvest(
    id: string,
    amount: number,
    authorization: string,
    opts: {
      currency: string;
    }
  ): Promise<void>;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  programInvest: ReturnType<typeof programInvestCreator>;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}
