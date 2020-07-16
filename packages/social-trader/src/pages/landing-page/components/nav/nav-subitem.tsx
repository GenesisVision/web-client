import clsx from "clsx";
import Link from "components/link/link";
import { useTranslation } from "i18n";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

import styles from "./nav-list.module.scss";

interface INavSubItemProps extends TNavHeader {
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavSubItem: React.FC<INavSubItemProps> = ({
  href,
  name,
  icon,
  state,
  hideMobile,
  onClick
}) => {
  const { t } = useTranslation();
  return (
    <li
      className={clsx(styles["nav-list__item"], {
        [styles["nav-list__item--hide-mobile"]]: hideMobile
      })}
    >
      {href && href.includes("http") ? (
        <a title={name} href={href} className={styles["nav-list__link"]}>
          {icon && (
            <span className={styles["nav-list__link-icon"]}>{icon}</span>
          )}
          {t(name)}
        </a>
      ) : (
        <Link
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
    </li>
  );
};
const NavSubItem = React.memo(_NavSubItem);
export default NavSubItem;
