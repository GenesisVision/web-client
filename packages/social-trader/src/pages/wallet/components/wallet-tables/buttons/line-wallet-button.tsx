import { RowItem } from "components/row-item/row-item";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";

export const _LineWalletButton: React.FC<Props> = ({
  title,
  className,
  children
}) => (
  <RowItem className={className}>
    <Tooltip render={() => <TooltipContent>{title}</TooltipContent>}>
      <div>{children}</div>
    </Tooltip>
  </RowItem>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

const LineWalletButton = React.memo(_LineWalletButton);
export default LineWalletButton;
