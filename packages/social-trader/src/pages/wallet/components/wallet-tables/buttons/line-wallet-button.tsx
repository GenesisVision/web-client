import classNames from "classnames";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

export const _LineWalletButton: React.FC<Props> = ({
  title,
  className,
  children
}) => (
  <Tooltip
    render={() => <div className="wallet-list__tooltip-button">{title}</div>}
  >
    <div className={classNames(className, "wallet-list__button")}>
      {children}
    </div>
  </Tooltip>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

const LineWalletButton = React.memo(_LineWalletButton);
export default LineWalletButton;
