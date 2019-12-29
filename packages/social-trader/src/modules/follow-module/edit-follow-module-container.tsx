import Dialog from "components/dialog/dialog";
import { SignalSubscription } from "gv-api-web";
import EditFollowModuleFormContainer from "modules/follow-module/follow-popup/edit-follow-popup-form.container";
import React from "react";
import { CurrencyEnum } from "utils/types";

const _EditFollowModuleContainer: React.FC<Props> = ({
  signalSubscription,
  tradingAccountId,
  id,
  currency,
  onClose,
  onApply,
  open
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <EditFollowModuleFormContainer
        signalSubscription={signalSubscription}
        tradingAccountId={tradingAccountId}
        onApply={onApply}
        onClose={onClose}
        id={id}
        currency={currency}
      />
    </Dialog>
  );
};

interface Props {
  signalSubscription: SignalSubscription;
  tradingAccountId: string;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
}

const EditFollowModuleContainer = React.memo(_EditFollowModuleContainer);
export default EditFollowModuleContainer;
