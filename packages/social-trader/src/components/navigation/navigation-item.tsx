import classNames from "classnames";
import GVButton from "components/gv-button";
import HeaderIcon from "components/header/header-icon";
import Link, { ToType } from "components/link/link";
import { useRouter } from "next/router";
import React from "react";

import { normalizeLinkFrom } from "../link/link.helper";
import styles from "./navigation.module.scss";

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
  <GVButton
    className={styles["navigation__button"]}
    variant="text"
    onClick={onClick}
  >
    <>
      <HeaderIcon>{<icon.type {...icon.props} />}</HeaderIcon>
      <span className={styles["navigation__link"]}>{children}</span>
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
      <span className={styles["navigation__link"]}>{children}</span>
    </>
  );
  return (
    (!!href && (
      <Link
        to={href}
        className={classNames(styles["navigation__item"], {
          [styles["navigation__item--active"]]: route.startsWith(
            normalizeLinkFrom(href)
          )
        })}
      >
        {renderIconWithName()}
      </Link>
    )) || (
      <div className={styles["navigation__item"]} onClick={onClick}>
        {renderIconWithName()}
      </div>
    )
  );
};
const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
