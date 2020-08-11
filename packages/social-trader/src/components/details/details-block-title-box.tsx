import { detailsBlockHorizontalPaddings } from "components/details/details.constants";
import { withStyles } from "decorators/withStyles";
import React from "react";
import { css } from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const dynamicStyles = css`
  ${detailsBlockHorizontalPaddings}
`;

const DetailsBlockTitleBox: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default withStyles({ dynamicStyles })(DetailsBlockTitleBox);
