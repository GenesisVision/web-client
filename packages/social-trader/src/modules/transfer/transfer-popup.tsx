import Dialog from "components/dialog/dialog";
import { InternalTransferRequestType } from "gv-api-web";
import { TransferContainerProps } from "modules/transfer/components/transfer-container";
import dynamic from "next/dynamic";
import * as React from "react";

import { TRANSFER_CONTAINER, TRANSFER_DIRECTION } from "./transfer.types";

const TransferContainer = dynamic(
  () => import("./components/transfer-container")
);

const _TransferPopup: React.FC<Props> = ({
  supportedCurrencies,
  isExchangeAccount,
  accountId,
  outerCurrentItemContainerItems,
  successMessage = "",
  singleCurrentItemContainer,
  onApply,
  title,
  currentItemContainer = TRANSFER_CONTAINER.SOURCE,
  sourceType = TRANSFER_DIRECTION.WALLET as InternalTransferRequestType,
  destinationType = TRANSFER_DIRECTION.WALLET as InternalTransferRequestType,
  currentItem,
  onClose,
  open
}) => (
  <Dialog open={open} onClose={onClose!}>
    <TransferContainer
      isExchangeAccount={isExchangeAccount}
      supportedCurrencies={supportedCurrencies}
      accountId={accountId}
      outerCurrentItemContainerItems={outerCurrentItemContainerItems}
      successMessage={successMessage}
      singleCurrentItemContainer={singleCurrentItemContainer}
      onApply={onApply}
      title={title}
      currentItemContainer={currentItemContainer}
      currentItem={currentItem}
      onClose={onClose}
      sourceType={sourceType}
      destinationType={destinationType}
    />
  </Dialog>
);

interface Props extends TransferContainerProps {
  open: boolean;
}

const TransferPopup = React.memo(_TransferPopup);
export default TransferPopup;
