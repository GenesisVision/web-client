import "./icon-list.scss";

import classNames from "classnames";
import * as React from "react";
import { TIconLinks } from "routes/ssr/landing-page/static-data/app-links";

import IconItem from "./icon-item";

const _IconList: React.FC<Props> = ({ items, className }) => (
  <ul className={classNames("icon-list", className)}>
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

export interface Props {
  items: TIconLinks[];
  className?: string;
}

const IconList = React.memo(_IconList);
export default IconList;
