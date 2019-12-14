import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { InternalTransferRequestType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import TransferPopup from "modules/transfer/transfer-popup";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";

const _TransferButton: React.FC<Props> = ({
  color,
  currentItem,
  sourceType,
  destinationType,
  title,
  currentItemContainer,
  variant = "contained",
  label,
  size,
  onApply,
  disabled
}) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  return (
    <>
      <GVButton
        color={color}
        size={size}
        disabled={disabled}
        variant={variant}
        onClick={setIsOpenPopup}
      >
        {label}
      </GVButton>
      <TransferPopup
        currentItem={currentItem}
        sourceType={sourceType}
        destinationType={destinationType}
        title={title}
        currentItemContainer={currentItemContainer}
        onApply={onApply}
        open={isOpenPopup}
        onClose={setIsClosePopup}
      />
    </>
  );
};

interface Props {
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label: string;
  size?: GV_BTN_SIZE;
  disabled?: boolean;
  onApply?: VoidFunction;
  currentItem: WalletItemType;
  sourceType?: InternalTransferRequestType;
  destinationType?: InternalTransferRequestType;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

const TransferButton = React.memo(_TransferButton);
export default TransferButton;
