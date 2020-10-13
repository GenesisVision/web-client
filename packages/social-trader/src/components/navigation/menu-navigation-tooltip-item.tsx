import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import * as React from "react";
import styled from "styled-components";
import { $paddingSmall } from "utils/style/sizes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  havePopover?: boolean;
  secondLevel?: JSX.Element[];
}

const SecondLevel = styled.div`
  padding: ${$paddingSmall / 2}px;
`;

export const MenuNavigationTooltipItem: React.FC<Props> = ({
  children,
  secondLevel,
  havePopover
}) => {
  switch (!!secondLevel && havePopover) {
    case true:
      return (
        <MenuTooltip
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={() => <SecondLevel>{secondLevel}</SecondLevel>}
        >
          <div>{children}</div>
        </MenuTooltip>
      );
    case false:
    default:
      return <>{children}</>;
  }
};
