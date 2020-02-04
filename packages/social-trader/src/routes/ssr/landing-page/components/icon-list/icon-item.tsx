import React from "react";
import { TIconLinks } from "routes/ssr/landing-page/static-data/app-links";

const _IconItem: React.FC<TIconLinks> = ({ href, name, icon }) => (
  <li className="icon-list__item">
    <a href={href} className="icon-list__link" target="_blank" title={name}>
      {icon}
    </a>
  </li>
);
const IconItem = React.memo(_IconItem);
export default IconItem;
