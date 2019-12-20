import React from "react";
import { TAppLinks } from "routes/ssr/landing-page/routes/app";

const _AppItem: React.FC<TAppLinks> = ({ href, name, icon }) => (
  <li className="app-list__item">
    <a href={href} className="app-list__link" target="_blank" title={name}>
      {icon}
    </a>
  </li>
);
const AppItem = React.memo(_AppItem);
export default AppItem;
