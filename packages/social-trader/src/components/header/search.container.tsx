import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { css } from "styled-components";
import { transition } from "utils/style/style-mixins";

interface Props {
  openSearch?: boolean;
  className?: string;
}

const dynamicStyles = css`
  ${transition("width")}
  width: ${({ openSearch }: Props) => (openSearch ? "100%" : "40px")};
`;

const _SearchContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const SearchContainer = withStyles<Props>({ dynamicStyles })(
  React.memo(_SearchContainer)
);
export default SearchContainer;
