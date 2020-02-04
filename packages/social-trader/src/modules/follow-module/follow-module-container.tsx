import Dialog from "components/dialog/dialog";
import { BrokerTradeServerType } from "gv-api-web";
import dynamic from "next/dynamic";
import React from "react";
import { CurrencyEnum } from "utils/types";

const FollowPopupFormContainer = dynamic(() =>
  import("modules/follow-module/follow-popup/follow-popup-form.container")
);

const _FollowModuleContainer: React.FC<Props> = ({
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
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
  onClose: VoidFunction;
  onApply?: VoidFunction;
  currency?: CurrencyEnum;
  id: string;
}

const FollowModuleContainer = React.memo(_FollowModuleContainer);
export default FollowModuleContainer;
