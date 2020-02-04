import { useToLink } from "components/link/link.helper";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TMenuItem } from "routes/menu";

import NavigationItem from "./navigation-item";

export const MenuNavigationItem: React.FC<Props> = ({
  item: { Icon, route = "", label, children },
  popover
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const renderNavigationItem = ({ Icon, route = "", label }: TMenuItem) => (
    <NavigationItem
      icon={<Icon primary />}
      href={linkCreator(route)}
      key={label}
    >
      {label && t(label)}
    </NavigationItem>
  );
  const havePopover = !!children && popover;
  const haveSecondLevel = !!children && !popover;
  return (
    <>
      <MenuNavigationTooltipItem
        havePopover={havePopover}
        secondLevel={children && children.map(renderNavigationItem)}
      >
        <NavigationItem icon={<Icon primary />} href={linkCreator(route)}>
          {label && t(label)}
        </NavigationItem>
      </MenuNavigationTooltipItem>
      {haveSecondLevel && (
        <div className="navigation__second-level">
          {children!.map(renderNavigationItem)}
        </div>
      )}
    </>
  );
};

interface Props {
  popover?: boolean;
  item: TMenuItem;
}

const MenuNavigationTooltipItem: React.FC<{
  havePopover?: boolean;
  secondLevel?: JSX.Element[];
} & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  secondLevel,
  havePopover
}) => {
  switch (!!secondLevel && havePopover) {
    case true:
      return (
        <MenuTooltip
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={() => (
            <div className="navigation__popover">{secondLevel}</div>
          )}
        >
          <div>{children}</div>
        </MenuTooltip>
      );
    case false:
    default:
      return <>{children}</>;
  }
};
