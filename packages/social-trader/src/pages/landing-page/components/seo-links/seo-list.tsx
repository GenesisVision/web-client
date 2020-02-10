import "./seo-list.scss";

import classNames from "classnames";
import SeoItem from "pages/landing-page/components/seo-links/seo-item";
import { TNavFooter } from "pages/landing-page/static-data/nav-links";
import React from "react";

const _SeoList: React.FC<Props> = ({ seoItems, className }) => (
  <ul className={classNames("seo-list", className)}>
    {seoItems.map((item: any, index: number) => (
      <SeoItem
        key={index}
        name={item.name}
        href={item.href}
        state={item.state}
      />
    ))}
  </ul>
);

export interface Props {
  seoItems: TNavFooter[];
  className?: string;
}

const SeoList = React.memo(_SeoList);
export default SeoList;
