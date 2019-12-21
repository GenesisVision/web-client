import "./app-list.scss";

import classNames from "classnames";
import * as React from "react";
import AppItem from "routes/ssr/landing-page/components/app-list/app-item";
import { TAppLinks } from "routes/ssr/landing-page/static-data/app-links";

const _AppList: React.FC<Props> = ({ appItems, className }) => (
  <ul className={classNames("app-list", className)}>
    {appItems.map((item: any, index: number) => (
      <AppItem
        key={index}
        name={item.name}
        href={item.href}
        icon={<item.icon />}
      />
    ))}
  </ul>
);

export interface Props {
  appItems: TAppLinks[];
  className?: string;
}

const AppList = React.memo(_AppList);
export default AppList;
