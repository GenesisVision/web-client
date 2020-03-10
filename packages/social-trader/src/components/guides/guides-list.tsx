import "./guides-list.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Ok from "media/ok.svg";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import React, { useCallback, useState } from "react";

interface Props {
  lessons: any;
  title: string;
  tab?: any;
  isVisible?: boolean;
}

const _GuidesList: React.FC<Props> = ({ lessons, title, tab, isVisible }) => {
  const { linkCreator } = useToLink();
  const [isVisibleList, setIsVisibleList] = useState(isVisible);
  const handleClickTitle = useCallback(() => {
    setIsVisibleList(!isVisibleList);
  }, [isVisibleList]);
  return (
    <>
      <h3 className="guides-container__nav-subtitle" onClick={handleClickTitle}>
        {title}
        {!isVisibleList && (
          <span className="guides-container__nav-number">{`${lessons.length} steps`}</span>
        )}
      </h3>
      {isVisibleList && (
        <ul className="guides-list">
          {lessons.map((item: any) => (
            <li key={item.id} className="guides-list__item">
              <Link
                className={classNames("guides-list__item-link", {
                  "guides-list__item-link--active":
                    String(item.id) === tab.slice(1, tab.length),
                  "guides-list__item-link--done": item.isDone,
                  "guides-list__item-link--disabled": !item.isAvailable
                })}
                to={linkCreator(`${GUIDES_TOTAL_PAGE_ROUTE}#${item.id}`)}
              >
                {item.lesson}
                {item.isDone && (
                  <ImageBaseElement
                    className="guides-list__item-icon"
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
