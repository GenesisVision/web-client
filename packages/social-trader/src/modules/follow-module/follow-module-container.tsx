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
  signalSubscription,
  currency,
  onClose,
  onApply,
  open
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <FollowPopupFormContainer
        onApply={onApply}
        onClose={onClose}
        broker={broker}
        leverage={leverage}
        brokerId={brokerId}
        isExternal={isExternal}
        signalSubscription={signalSubscription}
        id={id}
        currency={currency}
      />
    </Dialog>
  );
};

interface Props {
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

const FollowModuleContainer = React.memo(_FollowModuleContainer);
export default FollowModuleContainer;
