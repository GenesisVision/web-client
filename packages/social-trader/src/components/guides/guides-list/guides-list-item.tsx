import clsx from "clsx";
import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Ok from "media/ok.svg";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import React from "react";

import styles from "./guides-list.module.scss";

interface Props {
  guide: any;
  currentGuideId?: string;
}

const _GuidesListItem: React.FC<Props> = ({ guide, currentGuideId }) => {
  const { linkCreator } = useToLink();
  return (
    <li className={styles["guides-list__item"]}>
      <Link
        className={clsx(styles["guides-list__item-link"], {
          [styles["guides-list__item-link--active"]]:
            guide.id === currentGuideId,
          [styles["guides-list__item-link--done"]]: guide.isPassed,
          [styles["guides-list__item-link--disabled"]]: guide.isDisabled
        })}
        to={linkCreator(`${GUIDES_TOTAL_PAGE_ROUTE}#${guide.canonicalName}`)}
      >
        {guide.name}
        {guide.isPassed && (
          <ImageBaseElement
            className={styles["guides-list__item-icon"]}
            src={Ok}
            alt="Done"
          />
        )}
      </Link>
    </li>
  );
};

const GuidesListItem = React.memo(_GuidesListItem);
export default GuidesListItem;
