import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { css } from "styled-components";
import { hideOnLandscapeTablet, transition } from "utils/style/style-mixins";

interface Props {
  openSearch?: boolean;
  className?: string;
}

const dynamicStyles = css`
  overflow: hidden;
  ${transition("width")}
  ${hideOnLandscapeTablet("flex")}
  width: ${({ openSearch }: Props) => (openSearch ? 0 : "100%")}
`;

const _NavigationContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const NavigationContainer = withStyles<Props>({ dynamicStyles })(
  React.memo(_NavigationContainer)
);
export default NavigationContainer;
