import Link from "components/link/link";
import React from "react";

interface ISeoItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  name: string;
  href: string;
  icon?: JSX.Element;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _SeoItem: React.FC<ISeoItemProps> = ({ href, name, state, onClick }) => (
  <li className="seo-list__item">
    {href.includes("http") ? (
      <a title={name} href={href} className="seo-list__link">
        {name}
      </a>
    ) : (
      <Link
        title={name}
        onClick={onClick}
        to={{ pathname: href as string, state }}
        className="seo-list__link"
      >
        {name}
      </Link>
    )}
  </li>
);
const SeoItem = React.memo(_SeoItem);
export default SeoItem;
