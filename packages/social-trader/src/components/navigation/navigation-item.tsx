import classNames from "classnames";
import GVButton from "components/gv-button";
import HeaderIcon from "components/header/header-icon";
import Link, { ToType } from "components/link/link";
import { useRouter } from "next/router";
import React from "react";

import { normalizeLinkFrom } from "../link/link.helper";

interface INavigationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
  title?: string;
  onClick(): void;
}

const _NavigationButton: React.FC<INavigationButtonProps> = ({
  icon,
  children,
  onClick
}) => (
  <GVButton className="navigation__button" variant="text" onClick={onClick}>
    <>
      <HeaderIcon>{<icon.type {...icon.props} />}</HeaderIcon>
      <span className="navigation__link">{children}</span>
    </>
  </GVButton>
);
export const NavigationButton = React.memo(_NavigationButton);

interface INavigationItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string | ToType;
  icon: JSX.Element;
  exact?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  onClick,
  href,
  icon,
  children
}) => {
  const { route } = useRouter();
  const renderIconWithName = () => (
    <>
      <HeaderIcon>{<icon.type {...icon.props} />}</HeaderIcon>
      <span className="navigation__link">{children}</span>
    </>
  );
  return (
    (!!href && (
      <Link
        to={href}
        className={classNames("navigation__item", {
          "navigation__item--active": route.startsWith(normalizeLinkFrom(href))
        })}
      >
        {renderIconWithName()}
      </Link>
    )) || (
      <div className="navigation__item" onClick={onClick}>
        {renderIconWithName()}
      </div>
    )
  );
};
const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
