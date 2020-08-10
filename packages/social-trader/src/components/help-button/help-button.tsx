import {
  $iconColor,
  $labelColor
} from "components/gv-styles/gv-colors/gv-colors";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { css } from "styled-components";
import { OptionalClickable } from "utils/types";

interface Props extends OptionalClickable {
  muted?: boolean;
  className?: string;
}

const styleTable = {
  background: "none",
  padding: "0",
  "box-sizing": "border-box",
  width: {
    value: "15",
    unit: "px"
  },
  height: {
    value: "15",
    unit: "px"
  },
  border: `1px solid ${$iconColor}`,
  "border-radius": {
    value: "50",
    unit: "%"
  },
  "line-height": {
    value: "15",
    unit: "px"
  },
  "text-align": "center",
  "font-size": {
    value: "8",
    unit: "px"
  },
  "font-weight": "700",
  outline: "none",
  cursor: "pointer"
};

const additionalStyles = css`
  border-color: ${({ muted }: Props) => (muted ? $labelColor : $iconColor)};
  color: ${({ muted }: Props) => (muted ? $labelColor : $iconColor)};
`;

const HelpButton: React.FC<Props> = ({ muted, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      ?
    </div>
  );
};

export default withStyles<Props>({
  staticStyles: styleTable,
  dynamicStyles: additionalStyles
})(HelpButton);
