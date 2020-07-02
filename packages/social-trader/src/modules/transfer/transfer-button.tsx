import ImageBaseElement from "components/avatar/image-base.element";
import { Center } from "components/center/center";
import { CHIP_SIZE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import GVButton from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import ConvertIcon from "media/convert.svg";
import { TransferContainerProps } from "modules/transfer/components/transfer-container";
import TransferPopup from "modules/transfer/transfer-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import { SizesType } from "utils/types";

import styles from "./transfer.button.module.scss";

const _TransferButton: React.FC<Props> = ({
  fixedSelects,
  accountId,
  outerCurrentItemContainerItems,
  successMessage,
  singleCurrentItemContainer = false,
  size = "large",
  withIcon,
  color,
  variant,
  type = WALLET_BUTTON_TYPE.FULL,
  currentItem,
  sourceType,
  destinationType,
  title,
  currentItemContainer,
  label,
  onApply,
  disabled
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const Button = type === WALLET_BUTTON_TYPE.SMALL ? SmallButton : FullButton;
  return (
    <>
      <Button
        size={size}
        withIcon={withIcon}
        color={color}
        variant={variant}
        label={label}
        disabled={disabled}
        onClick={setIsOpenPopup}
      />
      <TransferPopup
        fixedSelects={fixedSelects}
        accountId={accountId}
        outerCurrentItemContainerItems={outerCurrentItemContainerItems}
        successMessage={successMessage}
        singleCurrentItemContainer={singleCurrentItemContainer}
        currentItem={currentItem}
        sourceType={sourceType}
        destinationType={destinationType}
        title={title || t("transfer:title")}
        currentItemContainer={currentItemContainer}
        onApply={onApply}
        open={isOpenPopup}
        onClose={setIsClosePopup}
      />
    </>
  );
};

interface Props extends TransferContainerProps {
  size?: SizesType;
  withIcon?: boolean;
  type?: WALLET_BUTTON_TYPE;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
}

const FullButton: React.FC<{
  size?: SizesType;
  withIcon?: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}> = React.memo(
  ({ disabled, onClick, label, color, variant, withIcon, size }) => {
    const [t] = useTranslation();
    const labelText = label || t("wallet-page:transfer");
    return (
      <GVButton
        className={labelText}
        size={size}
        color={color || "secondary"}
        variant={variant || "outlined"}
        disabled={disabled}
        onClick={onClick}
      >
        <Center>
          {withIcon && (
            <RowItem size={"small"}>
              <ImageBaseElement
                className={styles["transfer-button__full-button-icon"]}
                src={ConvertIcon}
                alt={labelText}
              />
            </RowItem>
          )}
          <RowItem>{labelText}</RowItem>
        </Center>
      </GVButton>
    );
  }
);

const SmallButton: React.FC<{ onClick: () => void }> = React.memo(
  ({ onClick }) => {
    const [t] = useTranslation();
    const label = t("wallet-page:transfer");
    return (
      <ChipButton
        className={label}
        onClick={onClick}
        size={CHIP_SIZE.SMALL}
        chipLabel={<ImageBaseElement src={ConvertIcon} alt={label} />}
      />
    );
  }
);

export enum WALLET_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

const TransferButton = React.memo(_TransferButton);
export default TransferButton;
