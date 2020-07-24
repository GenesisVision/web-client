import clsx from "clsx";
import HeaderIcon from "components/header/header-icon";
import Link, { ToType } from "components/link/link";
import { useRouter } from "next/router";
import React from "react";

import { normalizeLinkFrom } from "../link/link.helper";
import styles from "./navigation.module.scss";

interface INavigationItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  small?: boolean;
  href?: string | ToType;
  icon: JSX.Element;
  exact?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  small,
  onClick,
  href,
  icon,
  children
}) => {
  const { route } = useRouter();
  const renderIconWithName = () => (
    <>
      <HeaderIcon>
        <div
          className={clsx({
            [styles["navigation__icon--medium"]]: !small,
            [styles["navigation__icon--small"]]: small
          })}
        >
          {<icon.type {...icon.props} />}
        </div>
      </HeaderIcon>
      <span className={styles["navigation__link"]}>{children}</span>
    </>
  );
  return (
    (!!href && (
      <Link
        to={href}
        className={clsx(styles["navigation__item"], {
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
