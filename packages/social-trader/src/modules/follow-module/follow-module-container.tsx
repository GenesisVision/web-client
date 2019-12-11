import Dialog from "components/dialog/dialog";
import { BrokerTradeServerType, SignalSubscription } from "gv-api-web";
import FollowPopupFormContainer from "modules/follow-module/follow-popup/follow-popup-form.container";
import React from "react";
import { CurrencyEnum } from "utils/types";

const _FollowModuleContainer: React.FC<Props> = ({
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  hasSignalAccount,
  currency,
  onClose,
  onApply,
  open
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <FollowPopupFormContainer
        hasSignalAccount={hasSignalAccount}
        onApply={onApply}
        onClose={onClose}
        broker={broker}
        leverage={leverage}
        brokerId={brokerId}
        isExternal={isExternal}
        id={id}
        currency={currency}
      />
    </Dialog>
  );
};

interface Props {
  hasSignalAccount: boolean;
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  open: boolean;
  onClose: VoidFunction;
  onApply?: VoidFunction;
  currency: CurrencyEnum;
  id: string;
}

const FollowModuleContainer = React.memo(_FollowModuleContainer);
export default FollowModuleContainer;
