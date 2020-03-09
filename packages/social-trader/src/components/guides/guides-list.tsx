import "./guides-list.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import Ok from "media/ok.svg";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  guideList: any;
  lessonActive?: any;
}

const _GuidesList: React.FC<Props> = ({ guideList, lessonActive }) => {
  const [idActive, setIdActive] = useState(
    lessonActive ? lessonActive.id : null
  );
  const [isVisibleList, setIsVisibleList] = useState(!!lessonActive);
  const handleClickItem = useCallback(
    (item: any) => {
      if (item.id === idActive) return null;
      setIdActive(item.id);
    },
    [idActive]
  );
  const handleClickTitle = useCallback(() => {
    setIsVisibleList(!isVisibleList);
  }, [isVisibleList]);
  return (
    <>
      <h3 onClick={handleClickTitle}>{guideList.title}</h3>
      {isVisibleList && (
        <ul className="guides-list">
          {guideList.lessons.map((item: any) => (
            <li key={item.id} className="guides-list__item">
              <button
                type="button"
                onClick={() => handleClickItem(item)}
                className={classNames("guides-list__item-button", {
                  "guides-list__item-button--active": item.id === idActive,
                  "guides-list__item-button--done": item.isDone
                })}
                disabled={!item.isAvailable}
              >
                {item.lesson}
                {item.isDone && (
                  <ImageBaseElement
                    className="guides-list__item-icon"
                    src={Ok}
                    alt="Done"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const GuidesList = React.memo(_GuidesList);
export default GuidesList;
