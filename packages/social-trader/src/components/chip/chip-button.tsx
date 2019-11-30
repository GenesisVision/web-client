import "./chip.scss";

import Chip, { CHIP_TYPE } from "components/chip/chip";
import GVButton from "components/gv-button";
import * as React from "react";

const ChipButton: React.FC<Props> = React.memo(
  ({
    type,
    children,
    rounded,
    onClick,
    className,
    disabled,
    label,
    chipLabel
  }) => (
    <GVButton variant="text" onClick={onClick}>
      <div className="chip-button">
        <Chip type={type} disabled={disabled} rounded={rounded}>
          {chipLabel}
        </Chip>
        <div className="chip-button__label">{label}</div>
      </div>
    </GVButton>
  )
);

interface Props {
  label?: string;
  chipLabel?: string;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | undefined;
}

export default ChipButton;
