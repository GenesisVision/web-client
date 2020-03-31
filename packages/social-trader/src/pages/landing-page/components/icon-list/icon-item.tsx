import { useTranslation } from "i18n";
import { TIconLinks } from "pages/landing-page/static-data/app-links";
import React from "react";

const _IconItem: React.FC<TIconLinks> = ({ href, name, icon }) => {
  const { t } = useTranslation();
  return (
    <li className="icon-list__item">
      <a
        href={href}
        className="icon-list__link"
        target="_blank"
        rel="noopener noreferrer"
        title={t(name)}
      >
        {icon}
      </a>
    </li>
  );
};
const IconItem = React.memo(_IconItem);
export default IconItem;
