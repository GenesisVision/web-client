import HeaderIcon from "components/header/header-icon";
import React from "react";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";
import { $fontSizeParagraph } from "utils/style/sizes";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  small?: boolean;
  icon: JSX.Element;
}

const Container = styled.div<{ small?: boolean }>`
  width: ${({ small }) => (small ? "12px" : "20px")};
  height: ${({ small }) => (small ? "12px" : "20px")};
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
  small,
  icon,
  children
}) => {
  return (
    <>
      <HeaderIcon>
        <Container small={small}>{<icon.type {...icon.props} />}</Container>
      </HeaderIcon>
      <NavigationLink>{children}</NavigationLink>
    </>
  );
};

const NavigationIconWithName = React.memo(_NavigationIconWithName);
export default NavigationIconWithName;
