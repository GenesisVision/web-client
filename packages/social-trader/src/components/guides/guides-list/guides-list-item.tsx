import clsx from "clsx";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import { IGuide } from "pages/guides/guides.static-data";
import React from "react";

import styles from "./guides-list.module.scss";

interface Props {
  guide: IGuide;
  currentGuideId?: string;
}

const _GuidesListItem: React.FC<Props> = ({ guide, currentGuideId }) => {
  const { linkCreator } = useToLink();
  return (
    <li className={styles["guides-list__item"]}>
      <Link
        className={clsx(styles["guides-list__item-link"], {
          [styles["guides-list__item-link--active"]]:
            guide.id === currentGuideId
        })}
        to={linkCreator(`${GUIDES_TOTAL_PAGE_ROUTE}#${guide.canonicalName}`)}
      >
        {guide.name}
      </Link>
    </li>
  );
};

const GuidesListItem = React.memo(_GuidesListItem);
export default GuidesListItem;
