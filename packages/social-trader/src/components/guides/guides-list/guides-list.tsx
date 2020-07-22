import clsx from "clsx";
import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Guide } from "gv-api-web";
import Ok from "media/ok.svg";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import React, { useCallback, useEffect, useState } from "react";

import styles from "./guides-list.module.scss";

interface Props {
  guides: Guide[];
  name: string;
  currentId?: string;
}

const _GuidesList: React.FC<Props> = ({ name, guides, currentId }) => {
  const counts = guides.length;
  const countsText = counts === 1 ? `${counts} step` : `${counts} steps`;
  const { linkCreator } = useToLink();
  const [isVisibleList, setIsVisibleList] = useState(false);

  const handleClickTitle = useCallback(() => {
    setIsVisibleList(!isVisibleList);
  }, [isVisibleList]);

  useEffect(() => {
    setIsVisibleList(guides.some(guide => guide.id === currentId));
  }, [guides, currentId]);
  return (
    <>
      <h3 className={styles["guides-list-subtitle"]} onClick={handleClickTitle}>
        {name}
        {!isVisibleList && (
          <span className={styles["guides-list-subtitle__number"]}>
            {countsText}
          </span>
        )}
      </h3>
      {isVisibleList && (
        <ul className={styles["guides-list"]}>
          {guides.map(guide => (
            <li key={guide.id} className={styles["guides-list__item"]}>
              <Link
                className={clsx(styles["guides-list__item-link"], {
                  [styles["guides-list__item-link--active"]]:
                    guide.id === currentId,
                  [styles["guides-list__item-link--done"]]: guide.isPassed,
                  [styles["guides-list__item-link--disabled"]]: guide.isDisabled
                })}
                to={linkCreator(
                  `${GUIDES_TOTAL_PAGE_ROUTE}#${guide.canonicalName}`
                )}
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
          ))}
        </ul>
      )}
    </>
  );
};

const GuidesList = React.memo(_GuidesList);
export default GuidesList;
