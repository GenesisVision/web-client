import { useToLink } from "components/link/link.helper";
import { MenuNavigationTooltipItem } from "components/navigation/menu-navigation-tooltip-item";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TMenuItem } from "routes/menu";
import styled from "styled-components";
import { $paddingMedium } from "utils/style/sizes";

import NavigationItem from "./navigation-item";

interface Props {
  mobile?: boolean;
  popover?: boolean;
  item: TMenuItem;
}

const SecondLevel = styled.div`
  padding-left: ${$paddingMedium}px;
`;

export const MenuNavigationItem: React.FC<Props> = ({
  mobile,
  item: { Icon, route = "", label, children },
  popover
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const renderNavigationItem = ({ Icon, route = "", label }: TMenuItem) => {
    const RowTag = popover ? Row : "div";
    return (
      <RowTag>
        <NavigationItem
          mobile={mobile}
          small={!!popover}
          icon={<Icon primary />}
          href={linkCreator(route)}
          key={label}
        >
          {label && t(label)}
        </NavigationItem>
      </RowTag>
    );
  };
  const havePopover = !!children && popover;
  const haveSecondLevel = !!children && !popover;
  return (
    <>
      <MenuNavigationTooltipItem
        havePopover={havePopover}
        secondLevel={children && children.map(renderNavigationItem)}
      >
        <NavigationItem
          mobile={mobile}
          icon={<Icon primary />}
          href={linkCreator(route)}
        >
          {label && t(label)}
        </NavigationItem>
      </MenuNavigationTooltipItem>
      {haveSecondLevel && (
        <SecondLevel>{children!.map(renderNavigationItem)}</SecondLevel>
      )}
    </>
  );
};
