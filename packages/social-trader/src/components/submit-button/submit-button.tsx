import GVButton, { GVButtonProps } from "components/gv-button";
import React from "react";
import { useFormContext } from "react-hook-form";

export const SubmitButton: React.FC<Props> = ({
  checkValid = true,
  checkDirty = true,
  children,
  isSuccessful,
  isPending,
  disabled,
  type = "submit",
  ...props
}) => {
  const {
    formState: { isSubmitted, isValid, dirty, isSubmitting }
  } = useFormContext();
  const isPendingInner = isSubmitting || isPending;
  const isSuccessfulInner = isSubmitted && isSuccessful;
  const disabledInner =
    (checkValid && !isValid) ||
    (checkDirty && !dirty) ||
    isPendingInner ||
    isSuccessfulInner ||
    disabled;
  return (
    <GVButton
      {...props}
      type={type}
      isPending={isPendingInner}
      isSuccessful={isSuccessfulInner}
      disabled={disabledInner}
    >
      {children}
    </GVButton>
  );
};

interface Props extends GVButtonProps {
  checkValid?: boolean;
  checkDirty?: boolean;
  isSuccessful?: boolean;
  isPending?: boolean;
}
