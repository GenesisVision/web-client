import "./seo-list.scss";

import classNames from "classnames";
import * as React from "react";
import SeoItem from "routes/ssr/landing-page/components/seo-links/seo-item";
import { TNavFooter } from "routes/ssr/landing-page/routes/nav";

const _SeoList: React.FC<Props> = ({ seoItems, className }) => {
  return (
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
};

export interface Props {
  seoItems: TNavFooter[];
  className?: string;
}

const SeoList = React.memo(_SeoList);
export default SeoList;
