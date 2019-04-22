import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import TransferContainer, {
  ITransferContainerOwnProps
} from "./components/transfer-container";
import { TRANSFER_CONTAINER, TRANSFER_DIRECTION } from "./transfer.types";

const _TransferPopup: React.FC<Props> = ({
  title,
  currentItemContainer = TRANSFER_CONTAINER.SOURCE,
  sourceType = TRANSFER_DIRECTION.WALLET,
  destinationType = TRANSFER_DIRECTION.WALLET,
  currentItem,
  onClose,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <TransferContainer
      title={title}
      currentItemContainer={currentItemContainer}
      currentItem={currentItem}
      onClose={onClose}
      sourceType={sourceType}
      destinationType={destinationType}
    />
  </Dialog>
);

interface Props extends ITransferContainerOwnProps {
  open: boolean;
}

const TransferPopup = React.memo(_TransferPopup);
export default TransferPopup;
