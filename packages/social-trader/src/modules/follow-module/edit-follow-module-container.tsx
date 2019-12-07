import Dialog from "components/dialog/dialog";
import EditFollowModuleFormContainer from "modules/follow-module/follow-popup/edit-follow-popup-form.container";
import React from "react";
import { CurrencyEnum } from "utils/types";

const _EditFollowModuleContainer: React.FC<Props> = ({
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
  tradingAccountId: string;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
}

const EditFollowModuleContainer = React.memo(_EditFollowModuleContainer);
export default EditFollowModuleContainer;
