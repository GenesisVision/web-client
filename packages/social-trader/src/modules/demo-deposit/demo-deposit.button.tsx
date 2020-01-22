import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { IDemoDepositContainerProps } from "modules/demo-deposit/demo-deposit.container";
import { DemoDepositDialog } from "modules/demo-deposit/demo-deposit.dialog";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const _DemoDepositButton: React.FC<Props> = ({
  onApply,
  currency,
  id,
  size,
  withIcon,
  color,
  variant,
  label,
  disabled
}) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    setIsClose();
    onApply && onApply();
  }, []);
  return (
    <>
      <FullButton
        size={size}
        withIcon={withIcon}
        color={color}
        variant={variant}
        label={label}
        disabled={disabled}
        onClick={setIsOpen}
      />
      <DemoDepositDialog
        onApply={handleOnApply}
        currency={currency}
        id={id}
        onClose={setIsClose}
        open={isOpen}
      />
    </>
  );
};

export const FullButton: React.FC<
  IFullButtonProps & { onClick: () => void }
> = React.memo(
  ({ disabled, onClick, label, color, variant, withIcon, size }) => {
    const [t] = useTranslation();
    const labelText = label || t("wallet-page.deposit");
    return (
      <GVButton
        size={size}
        color={color || "primary"}
        variant={variant || "contained"}
        disabled={disabled}
        onClick={onClick}
      >
        {labelText}
      </GVButton>
    );
  }
);

interface IFullButtonProps {
  size?: GV_BTN_SIZE;
  withIcon?: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  variant?: "text" | "outlined" | "contained";
  label?: string;
  disabled?: boolean;
}

interface Props extends IFullButtonProps, IDemoDepositContainerProps {}

export const DemoDepositButton = React.memo(_DemoDepositButton);
