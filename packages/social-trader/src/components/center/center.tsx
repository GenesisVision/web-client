import { withStyles } from "decorators/withStyles";
import React from "react";
import { css } from "styled-components";
import { cursorPointer } from "utils/style/style-mixins";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}

const dynamicStyles = css`
  display: flex;
  ${({ center = true }: Props) => center && "align-items: center"};
  flex-wrap: ${({ wrap }: Props) => (wrap ? "wrap" : "nowrap")};
  ${cursorPointer}
`;

const _Center: React.FC<Props> = ({ className, children, ...otherProps }) => {
  return (
    <div {...otherProps} className={className}>
      {children}
    </div>
  );
};

export const Center = withStyles({ dynamicStyles })(_Center);
