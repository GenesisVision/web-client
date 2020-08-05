import clsx from "clsx";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import React from "react";

import styles from "./guide-block.module.scss";

interface Props {
  guideCanonicalName: string;
  isNext?: boolean;
  children: string;
}

const _GuideBlockLink: React.FC<Props> = ({
  guideCanonicalName,
  isNext,
  children
}) => {
  const { linkCreator } = useToLink();
  return (
    <span
      className={clsx(styles["guide-block__link"], {
        [styles["guide-block__link--next"]]: isNext
      })}
    >
      <Link
        wide
        white
        to={linkCreator(`${GUIDES_TOTAL_PAGE_ROUTE}#${guideCanonicalName}`)}
      >
        {children}
      </Link>
    </span>
  );
};

const GuideBlockLink = React.memo(_GuideBlockLink);
export default GuideBlockLink;
