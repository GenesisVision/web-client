import clsx from "clsx";
import SeoItem from "pages/landing-page/components/seo-links/seo-item";
import { TNavFooter } from "pages/landing-page/static-data/nav-links";
import React from "react";

import styles from "./seo-list.module.scss";

const _SeoList: React.FC<Props> = ({ seoItems, className, isMobile }) => (
  <ul
    className={clsx(styles["seo-list"], className, {
      [styles["seo-list--is-mobile"]]: isMobile
    })}
  >
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
  isMobile?: boolean;
}

const SeoList = React.memo(_SeoList);
export default SeoList;
