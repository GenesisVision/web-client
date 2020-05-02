import classNames from "classnames";
import { TIconLinks } from "pages/landing-page/static-data/app-links";
import React from "react";

import IconItem from "./icon-item";
import styles from "./icon-list.module.scss";

interface Props {
  items: TIconLinks[];
  className?: string;
  lightTheme?: boolean;
}

const _IconList: React.FC<Props> = ({ items, className, lightTheme }) => (
  <ul
    className={classNames(styles["icon-list"], className, {
      [styles["icon-list--color-gray"]]: lightTheme
    })}
  >
    {items.map((item: any, index: number) => (
      <IconItem
        key={index}
        name={item.name}
        href={item.href}
        icon={<item.icon />}
      />
    ))}
  </ul>
);

const IconList = React.memo(_IconList);
export default IconList;
