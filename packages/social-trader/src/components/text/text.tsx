import { dynamicTextStyles } from "components/text/text.styles";
import { ITextProps } from "components/text/text.types";
import { withStyles } from "decorators/withStyles";
import React from "react";

const _Text: React.FC<ITextProps> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

export const Text = withStyles({ dynamicStyles: dynamicTextStyles })(_Text);
