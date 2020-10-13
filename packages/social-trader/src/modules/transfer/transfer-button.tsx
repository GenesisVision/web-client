import ImageBaseElement from "components/avatar/image-base.element";
import { Button } from "components/button/button";
import { Center } from "components/center/center";
import ChipButton from "components/chip/chip-button";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import ConvertIcon from "media/convert.svg";
import { TransferContainerProps } from "modules/transfer/components/transfer-container";
import TransferPopup from "modules/transfer/transfer-popup";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { Clickable, Sizeable } from "utils/types";

export enum WALLET_BUTTON_TYPE {
  SMALL = "SMALL",
  FULL = "FULL"
}

interface Props extends TransferContainerProps, Sizeable {
  withIcon?: boolean;
  type?: WALLET_BUTTON_TYPE;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
}

interface FullButtonProps extends Sizeable, Clickable {
  withIcon?: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
}

const FullButtonIcon = styled(ImageBaseElement)`
  height: 8px;
  ${mediaBreakpointLandscapePhone("height: 12px;")};
`;

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

const FullButton: React.FC<FullButtonProps> = React.memo(
  ({ disabled, onClick, label, color, variant, withIcon, size }) => {
    const [t] = useTranslation();
    const labelText = label || t("wallet-page:transfer");
    return (
      <Button
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
              <FullButtonIcon src={ConvertIcon} alt={labelText} />
            </RowItem>
          )}
          <RowItem>{labelText}</RowItem>
        </Center>
      </Button>
    );
  }
);

const SmallButton: React.FC<Clickable> = React.memo(({ onClick }) => {
  const [t] = useTranslation();
  const label = t("wallet-page:transfer");
  return (
    <ChipButton
      className={label}
      onClick={onClick}
      size={"small"}
      chipLabel={<ImageBaseElement src={ConvertIcon} alt={label} />}
    />
  );
});

const TransferButton = React.memo(_TransferButton);
export default TransferButton;
