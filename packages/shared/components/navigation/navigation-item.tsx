import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import GVButton from "shared/components/gv-button";

interface INavigationButtonProps {
  icon: JSX.Element;
  title?: string;
  onClick(): void;
}

const _NavigationButton: React.FC<INavigationButtonProps> = ({
  icon,
  title,
  children,
  onClick
}) => (
  <GVButton className="navigation__button" variant="text" onClick={onClick}>
    <>
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </>
  </GVButton>
);
export const NavigationButton = React.memo(_NavigationButton);

interface INavigationItemProps {
  href: string | { pathname: string; state: string };
  icon: JSX.Element;
  title?: string;
  exact?: boolean;
  onClick?(): void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  href,
  icon,
  title,
  children,
  ...other
}) => {
  const { route } = useRouter();
  return (
    //<NavLink
    //className="navigation__item"
    //activeClassName="navigation__item--active"
    //to={href}
    //title={title}
    //{...other}
    //>
    <Link href={href}>
      <a
        className={classNames("navigation__item", {
          "navigation__item--active": href === route
        })}
      >
        {<icon.type {...icon.props} className="navigation__icon" />}
        <span className="navigation__link">{children}</span>
      </a>
    </Link>
    // </NavLink>
  );
};

const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
