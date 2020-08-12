import { $paddingSmall } from "components/gv-styles/gv-sizes";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { withStyles } from "decorators/withStyles";
import * as React from "react";

import styles from "./navigation.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  havePopover?: boolean;
  secondLevel?: JSX.Element[];
}

const staticStyles = {
  padding: `${$paddingSmall / 2}px`
};

const _MenuNavigationTooltipItem: React.FC<Props> = ({
  className,
  children,
  secondLevel,
  havePopover
}) => {
  switch (!!secondLevel && havePopover) {
    case true:
      return (
        <MenuTooltip
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={() => <div className={className}>{secondLevel}</div>}
        >
          <div>{children}</div>
        </MenuTooltip>
      );
    case false:
    default:
      return <>{children}</>;
  }
};

export const MenuNavigationTooltipItem = withStyles({ staticStyles })(
  _MenuNavigationTooltipItem
);
