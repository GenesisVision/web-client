import { $mainColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeParagraph } from "components/gv-styles/gv-sizes";
import HeaderIcon from "components/header/header-icon";
import { withStyles } from "decorators/withStyles";
import React from "react";
import styled, { css } from "styled-components";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  small?: boolean;
  icon: JSX.Element;
}

const dynamicStyles = css`
  width: ${({ small }: Props) => (small ? "12px" : "20px")};
  height: ${({ small }: Props) => (small ? "12px" : "20px")};
`;

const NavigationLink = styled.span`
  display: flex;
  align-items: center;
  color: ${$mainColor};
  font-size: ${$fontSizeParagraph}px;
  font-weight: 400;
  letter-spacing: 0.2px;
`;

const _NavigationIconWithName: React.FC<Props> = ({
  className,
  icon,
  children
}) => {
  return (
    <>
      <HeaderIcon>
        <div className={className}>{<icon.type {...icon.props} />}</div>
      </HeaderIcon>
      <NavigationLink>{children}</NavigationLink>
    </>
  );
};

const NavigationIconWithName = withStyles<Props>({ dynamicStyles })(
  React.memo(_NavigationIconWithName)
);
export default NavigationIconWithName;
