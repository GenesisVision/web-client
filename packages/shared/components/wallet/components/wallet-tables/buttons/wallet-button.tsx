import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import Tooltip from "shared/components/tooltip/tooltip";

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
    <div className="wallet-list__button">
      <Chip
        className={className}
        type={chipType}
        onClick={handleOpen}
        disabled={disabled}
      >
        {children}
      </Chip>
    </div>
  </Tooltip>
);

interface Props
  extends ParentWalletButtonProps,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className: string;
  chipType?: CHIP_TYPE;
}

export interface ParentWalletButtonProps {
  handleOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
}

const WalletButton = React.memo(_WalletButton);
export default WalletButton;
