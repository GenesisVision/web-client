import Chip, { CHIP_TYPE } from "components/chip/chip";
import useFlag from "hooks/flag.hook";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { $primaryColor } from "utils/style/colors";
import { Clickable, Sizeable } from "utils/types";

interface Props extends Sizeable, Clickable {
  stretch?: boolean;
  reverseOrder?: boolean;
  label?: string | JSX.Element;
  chipLabel?: string | number | ReactNode;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
}

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

const Container = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  &:hover {
    svg [stroke] {
      stroke: ${$primaryColor};
    }
  }
  ${({ reverseOrder }: { reverseOrder?: boolean }) =>
    reverseOrder && `flex-direction: row-reverse;`}
`;

const ChipButton: React.FC<Props> = React.memo(
  ({
    stretch,
    reverseOrder,
    size = "small",
    type,
    children,
    rounded,
    onClick,
    className,
    disabled,
    label,
    chipLabel
  }) => {
    const [over, setOver, setLeave] = useFlag();
    return (
      <Container
        reverseOrder={reverseOrder}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={setOver}
        onMouseLeave={setLeave}
      >
        <Chip
          pointer
          hover={over}
          type={type}
          disabled={disabled}
          rounded={rounded}
          size={size}
          stretch={stretch}
        >
          {chipLabel}
        </Chip>
        {label && <Label>{label}</Label>}
      </Container>
    );
  }
);

export default ChipButton;
