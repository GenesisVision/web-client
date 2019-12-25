import { useToLink } from "components/link/link.helper";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import Tooltip from "components/tooltip/tooltip";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TMenuItem } from "routes/menu";

import NavigationItem from "./navigation-item";

const _MenuNavigationItem: React.FC<Props> = ({
  item: { Icon, route = "", label, children },
  popover
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const renderNavigationItem = ({ Icon, route = "", label }: TMenuItem) => (
    <NavigationItem
      icon={<Icon primary />}
      href={linkCreator(route)}
      onClick={clearAnchor}
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
        secondLevel={children && children.map(renderNavigationItem)}
      >
        <NavigationItem
          icon={<Icon primary />}
          href={linkCreator(route)}
          onClick={setAnchor}
        >
          {label && t(label)}
          {havePopover && <FilterArrowIcon />}
        </NavigationItem>
      </MenuNavigationTooltipItem>
      {havePopover && (
        <>
          {/*<Popover
            className="navigation__popover"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            fixedVertical
            anchorEl={anchor}
            onClose={clearAnchor}
            horizontal={HORIZONTAL_POPOVER_POS.CENTER}
            noPadding
          >
            {children!.map(renderNavigationItem)}
          </Popover>*/}
        </>
      )}
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

const MenuNavigationTooltipItem: React.FC<
  {
    secondLevel?: JSX.Element[];
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, secondLevel }) => {
  switch (!!secondLevel) {
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

export const MenuNavigationItem = React.memo(_MenuNavigationItem);
