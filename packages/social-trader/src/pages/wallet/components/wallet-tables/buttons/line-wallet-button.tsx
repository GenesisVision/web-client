import { RowItem } from "components/row-item/row-item";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const _LineWalletButton: React.FC<Props> = ({ title, children }) => (
  <RowItem>
    <Tooltip render={() => <TooltipContent>{title}</TooltipContent>}>
      <div>{children}</div>
    </Tooltip>
  </RowItem>
);

const LineWalletButton = React.memo(_LineWalletButton);
export default LineWalletButton;
