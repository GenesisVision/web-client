import classNames from "classnames";
import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

export const _WalletButton: React.FC<Props> = ({
  handleOpen,
  disabled,
  title,
  className,
  chipType,
  children
}) => (
  <Tooltip
    render={() => <div className="wallet-list__tooltip-button">{title}</div>}
  >
    <div className={classNames(className, "wallet-list__button")}>
      <ChipButton
        disabled={disabled}
        reverseOrder
        onClick={handleOpen}
        type={chipType}
        chipLabel={children}
      />
    </div>
  </Tooltip>
);

interface Props
  extends ParentWalletButtonProps,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
  chipType?: CHIP_TYPE;
}

export interface ParentWalletButtonProps {
  handleOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
}

const WalletButton = React.memo(_WalletButton);
export default WalletButton;
