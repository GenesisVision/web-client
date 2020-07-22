import GuidesListHeader from "components/guides/guides-list/guides-list-header";
import GuidesListItem from "components/guides/guides-list/guides-list-item";
import { Guide } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";

import styles from "./guides-list.module.scss";

interface Props {
  guides: Guide[];
  name: string;
  currentId?: string;
}

const _GuidesList: React.FC<Props> = ({ name, guides, currentId }) => {
  const [isVisibleList, setIsVisibleList] = useState(false);

  const handleClickTitle = useCallback(() => {
    setIsVisibleList(!isVisibleList);
  }, [isVisibleList]);

  useEffect(() => {
    setIsVisibleList(guides.some(guide => guide.id === currentId));
  }, [guides, currentId]);
  return (
    <>
      <GuidesListHeader
        name={name}
        guidesTotal={guides.length}
        onClick={handleClickTitle}
        isVisibleList={isVisibleList}
      />
      {isVisibleList && (
        <ul className={styles["guides-list"]}>
          {guides.map(guide => (
            <GuidesListItem
              key={guide.id}
              guide={guide}
              currentGuideId={currentId}
            />
          ))}
        </ul>
      )}
    </>
  );
};

const GuidesList = React.memo(_GuidesList);
export default GuidesList;
