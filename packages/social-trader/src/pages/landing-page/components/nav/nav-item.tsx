import clsx from "clsx";
import Link from "components/link/link";
import { useTranslation } from "i18n";
import { useRouter } from "next/router";
import NavSubList from "pages/landing-page/components/nav/nav-sublist";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React, { useCallback, useState } from "react";

import styles from "./nav-list.module.scss";

interface INavItemProps extends TNavHeader {
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavItem: React.FC<INavItemProps> = ({
  href,
  name,
  icon,
  state,
  hideMobile,
  subNav,
  subNavOpen,
  onClick
}) => {
  const { t } = useTranslation();
  const [subOpen, setSubOpen] = useState(subNavOpen);
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!subNav) return;
      if (!subOpen) setSubOpen(true);
    },
    [subOpen]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!subNav) return;
      if (subOpen) setSubOpen(false);
    },
    [subOpen]
  );
  return (
    <li
      className={clsx(styles["nav-list__item"], {
        [styles["nav-list__item--hide-mobile"]]: hideMobile,
        [styles["nav-list__item--sub-open"]]: subOpen
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <>
        {href && href.includes("http") ? (
          <a title={name} href={href} className={styles["nav-list__link"]}>
            {icon && (
              <span className={styles["nav-list__link-icon"]}>{icon}</span>
            )}
            {t(name)}
          </a>
        ) : (
          <Link
            white
            title={t(name)}
            onClick={onClick}
            to={{ pathname: href as string, state }}
            className={styles["nav-list__link"]}
          >
            {icon && (
              <span className={styles["nav-list__link-icon"]}>{icon}</span>
            )}
            {t(name)}
          </Link>
        )}
        {subNav && (
          <NavSubList subNav={subNav} onClick={onClick} subNavOpen={subOpen} />
        )}
      </>
    </li>
  );
};
const NavItem = React.memo(_NavItem);
export default NavItem;
